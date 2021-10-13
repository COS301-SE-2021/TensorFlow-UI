import {TFNode, widgetStructure} from "../node";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../Components/navbar/navbar.component";

export abstract class TFOperator extends TFNode {
	protected constructor(public name: string | undefined = undefined) {
		super(name, "Operator",undefined);
	}

	getDType(widgets: widgetStructure[]): string{
		for(let widget of widgets){
			if(widget.type === "dtype"){
				return widget.value;
			}
		}
		return "float";
	}

	genericOperatorCode(storageLinks,storageNodes,operatorType):string{
		let parameters: TFNode[] = [];
		let dTypeArray: string[] = [];

		for(let input of this.inputs){
			const link = storageLinks.find(element => element.id == input.link);
			const inputNode = storageNodes.find(element => element.id == link?.origin_id);
			parameters.push(inputNode);
			if(inputNode){
				dTypeArray.push(this.getDType(inputNode.widgets));
			}
			else {
				alert("Both input nodes (a and b) are required for the "+operatorType+" operator");
				return "";
			}
		}
		if(dTypeArray[0] !== dTypeArray[1]){
			alert("The second input tensor. Must have the same dtype as a, for the "+operatorType+" operator");
			return "";
		}

		return <string>parameters[0].name+","+parameters[1].name;
	}

	genericLogicGateOperatorsCode(storageLinks,storageNodes,operatorType):string{
		let parameters: TFNode[] = [];

		for(let input of this.inputs){
			const link = storageLinks.find(element => element.id == input.link);
			const inputNode = storageNodes.find(element => element.id == link?.origin_id);
			parameters.push(inputNode);
			if(inputNode){
				if(this.getDType(inputNode.widgets) !== "bool"){
					alert("Both inputs must be of dtype bool, for the "+operatorType+" operator");
					return "";
				}
			}
			else {
				alert("Both input nodes (a and b) are required for the "+operatorType+" operation");
				return "";
			}
		}

		return <string>parameters[0].name+","+parameters[1].name;
	}

	genericReductionCode(storageLinks, storageNodes,operatorType:string): string{

		let res="";
		const link = storageLinks.find(element => element.id == this.inputs[0].link);
		if(!link){
			alert("Input node(x) required for the "+ operatorType +" operation");
			return "";
		}
		const inputNode = storageNodes.find(element => element.id == link?.origin_id);
		res = inputNode.name;
		let dType = this.getDType(inputNode.widgets);
		if(dType!=="bool"){
			alert("Input node(x) must be of dtype bool for the "+ operatorType +" operation");
			return "";
		}

		if(this.widgets.length>0){
			let temp = this.widgets.find(element => element.type == "axis?")?.value;
			if(temp==undefined)
				temp="None";
			res +=","+temp;

			let temp2 = this.widgets.find(element => element.type == "keepDims?")?.value;
			if(temp2==undefined)
				res +=",false";
			else
				res +=","+temp2;
		}
		return res;
	}

	genericArithmeticCode(storageLinks, storageNodes,operatorType:string): string{

		let res="";
		const link1 = storageLinks.find(element => element.id == this.inputs[0].link);
		if(!link1){
			alert("Input node(a) required for the "+ operatorType +" operation, in node: "+this.name);
			return "undefined";
		}
		const link2 = storageLinks.find(element => element.id == this.inputs[1].link);
		if(!link2){
			alert("Input node(b) required for the "+ operatorType +" operation, in node: "+this.name);
			return "undefined";
		}

		const inputNode1 = storageNodes.find(element => element.id == link1?.origin_id);
		const inputNode2 = storageNodes.find(element => element.id == link2?.origin_id);

		res = inputNode1.name;
		res += ","+inputNode2.name;

		let inputNode1DType = inputNode1.widgets.find(element => element.type =="dtype?")?.value;
		if(inputNode1DType==undefined){
			inputNode1DType = "float";
		}
		let inputNode2DType = inputNode2.widgets.find(element => element.type =="dtype?")?.value;
		if(inputNode2DType==undefined){
			inputNode2DType = "float";
		}

		if(inputNode1DType!==inputNode2DType &&operatorType!=="Pow"){
			alert("The second input node(y) must have the same dtype as the first input(x), for the node named: "+this.name);
			return "undefined";
		}

		return res;
	}

	genericReductionArgsCode(storageLinks, storageNodes,operatorType:string): string{

		let res="";
		const link = storageLinks.find(element => element.id == this.inputs[0].link);
		if(!link){
			alert("Input node(x) required for the "+ operatorType +" operation");
			return "";
		}
		const inputNode = storageNodes.find(element => element.id == link?.origin_id);
		res = inputNode.name;

		if(this.widgets.length>0){
			let temp = this.widgets.find(element => element.type == "axis?")?.value;
			if(temp==undefined)
				temp="0";

			res +=","+temp;

			let temp2 = this.widgets.find(element => element.type == "keepDims?")?.value;
			if(temp2==undefined)
				res +=",tf.int64";
			else
				res +=","+temp2;
		}
		return res;
	}

	genericReductionUIStructure(node: LGraphNode,navbar?:NavbarComponent){
		const that=this;
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array

		let widgetsData=["None",false];
		let widgetTypes= ["axis?","keepDims?"];

		for(let i=0; i<2;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null) {
				widgetsData[i] = widget.value;
			}
		}

		node.addWidget("text",widgetTypes[0],widgetsData[0],function (value){

			if (that.checkIfNumber(value) || that.checkIfWidgetTypeIsAVectorArray(value, "axis?"))
				that.changeWidgetValue(value, widgetTypes[0], navbar);
			else {
				alert("The axis property has to either be of type number or number[]");
			}
		});

		node.addWidget("toggle",widgetTypes[1],widgetsData[1],function (value){
			that.changeWidgetValue(value,widgetTypes[1],navbar);
		});

		node.addOutput("tf.Tensor", "tf.Tensor");
	}

	genericReductionArgsUIStructure(node: LGraphNode,navbar?:NavbarComponent){
		const that=this;
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array

		let widgetsData=["0","tf.int64"];
		let widgetTypes= ["axis?","output_type?"];

		for(let i=0; i<2;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null) {
				widgetsData[i] = widget.value;
			}
		}

		node.addWidget("text",widgetTypes[0],widgetsData[0],function (value){
			if (that.checkIfNumber(value))
				that.changeWidgetValue(value, widgetTypes[0], navbar);
			else {
				alert("The axis property has to be of type number");
			}
		});

		node.addWidget("combo",widgetTypes[1],widgetsData[1],function (value){
			that.changeWidgetValue(value,widgetTypes[1],navbar);
		},{values:["tf.int64","tf.int32"]});

		node.addOutput("Tensor of output_type", "tf.Tensor");
	}

	genericConvolutionUIStructure(widgetsData,widgetTypes,node,navbar){

		for(let i=0; i<widgetTypes.length;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		for(let i=0; i<widgetTypes.length;++i){
			if(widgetTypes[i]==="ksize"){
				node.addWidget("text",widgetTypes[i],widgetsData[i], (value) => {
					if(this.isConvolutionSizeCorrect(value,widgetTypes[i],node))
						this.changeWidgetValue(value,widgetTypes[i],navbar);
					else
						this.resetWidgetValueToLast(widgetTypes[i],node,widgetsData[i]);
				});
			}
			if(widgetTypes[i]=="strides"||widgetTypes[i]=="stride"){
				node.addWidget("text",widgetTypes[i],widgetsData[i], (value) => {
					if(this.isConvolutionSizeCorrect(value,widgetTypes[i],node))
						this.changeWidgetValue(value,widgetTypes[i],navbar);
					else
						this.resetWidgetValueToLast(widgetTypes[i],node,widgetsData[i]);
				});
			}
			if(widgetTypes[i]=="padding"){
				node.addWidget("combo",widgetTypes[i],widgetsData[i],(value) => {
					this.changeWidgetValue(value,widgetTypes[i],navbar);
				},{values: ['"SAME"','"VALID"']});
			}
			if(widgetTypes[i]=="data_format" && node.title==="Dilation2d"){
				node.addWidget("combo",widgetTypes[i],widgetsData[i],(value) => {},{values: ['"NHWC"']});
			}
			else if(widgetTypes[i]=="data_format" && node.title==="DepthWiseConv2d"){
				node.addWidget("combo",widgetTypes[i],widgetsData[i],(value) => {
					this.changeWidgetValue(value,widgetTypes[i],navbar);
				},{values: ['"NHWC"','"NCHW"']});
			}
			else if((widgetTypes[i]=="data_format" && node.title!=="Conv1d") || (widgetTypes[i]=="data_format" && node.title!=="Conv3d")){
				node.addWidget("combo",widgetTypes[i],widgetsData[i],(value) => {
					this.changeWidgetValue(value,widgetTypes[i],navbar);
				},{values: ['"NDHWC"','"NCDHW"']});
			}
			else if(widgetTypes[i]=="data_format" && node.title=="Conv1d"){
				node.addWidget("combo",widgetTypes[i],widgetsData[i],(value) => {
					this.changeWidgetValue(value,widgetTypes[i],navbar);
				},{values: ['"NWC"','"NCW"']});
			}
			if(widgetTypes[i]=="dilations"){
				node.addWidget("text",widgetTypes[i],widgetsData[i], (value) => {
					if(this.isConvolutionSizeCorrect(value,widgetTypes[i],node))
						this.changeWidgetValue(value,widgetTypes[i],navbar);
					else
						this.resetWidgetValueToLast(widgetTypes[i],node,widgetsData[i]);
				});
			}
			if(widgetTypes[i]=="output_shape"){
				node.addWidget("text",widgetTypes[i],widgetsData[i], (value) => {
					if(this.checkIfWidgetTypeIsAVectorArray(value,widgetTypes[i]))
						this.changeWidgetValue(value,widgetTypes[i],navbar);
					else
						this.resetWidgetValueToLast(widgetTypes[i],node,widgetsData[i]);
				});
			}

		}
		node.addWidget("text","name",this.name,(value) => {
			this.changeWidgetValue(value,"name",navbar,node);
		});

	}

	isConvolutionSizeCorrect(value,type,node):boolean{
		value = value.trim();
		if(this.checkIfWidgetTypeIsAVectorArray(value,type)){
			let res = value.substring(1,value.length-1);

			let numbersArray = res.split(',');
			for(let elem of numbersArray){
				if (!isNaN(Number(elem))) {
					let numberToCheck: number = +elem;
					if(!(Number.isInteger(numberToCheck))){
						this.errorMessageHelper(type,node);
						return false;
					}
				}
			}

			if(node.title==="Conv2d"){
				if(numbersArray.length==1 || numbersArray.length==2 || numbersArray.length==4){
					return true;
				}
			}
			else if (node.title==="Conv3d"){
				if(numbersArray.length>=5)
					return true;
			}
			else if (node.title==="DepthWiseConv2d"){
				if(type==="strides" && numbersArray.length==4)
					return true;
				if(type==="dilations" && numbersArray.length==2)
					return true;
			}
			else if (node.title==="Dilation2d"){
				if(numbersArray.length>=4)
					return true;
			}
			else{
				if(numbersArray.length==1 || numbersArray.length==3 || (numbersArray.length==5 && type!=="dilations")){
					return true;
				}
			}
		}

		if (!isNaN(Number(value))) {
			let numberToCheck: number = +value;
			if(Number.isInteger(numberToCheck)){
				return true;
			}
		}

		this.errorMessageHelper(type,node);
		return false;
	}

	errorMessageHelper(type,node){
		if(type=="dilations") {
			if(node.title=="Conv1d")
				alert("The " + type + " property has to either be an integer or list of integers that has length 1,2 or 4. ([int] | [int,int] | [int,int,int,int]). Defaults to 1. ");
			else if(node.title=="Conv3d")
				alert("The " + type + " property has to either be a list of integers that has length greater than 5. ([int,int,int,int,int]).");
			else if(node.title==="DepthWiseConv2d"){
				alert("The " + type + " property has to either be an a 1D list of integers that has a length of 2.");
			}
			else if(node.title==="Dilation2d"){
				alert("The " + type + " property has to either be an a 1D list of integers that has a length of 4 or more.");
			}
			else
				alert("The " + type + " property has to either be an an integer or list of integers that has length 1 or 3 ([int] | [int,int] | [int,int,int]). Defaults to 1. ");
		}
		else if(type=="strides"){
			if(node.title==="DepthWiseConv2d"){
				alert("The " + type + " property has to either be an a 1D list of integers that has a length of 4.");
			}
			else if(node.title==="Dilation2d"){
				alert("The " + type + " property has to either be an a 1D list of integers that has a length of 4 or more.");
			}
		}
		else
			alert("The "+type+" property has to either be an an integer or list of integers that has length 1, 3 or 5 ([int]| [int,int,int]| [int,int,int,int,int]). The size of the window for each dimension of the input tensor. ");
	}

}

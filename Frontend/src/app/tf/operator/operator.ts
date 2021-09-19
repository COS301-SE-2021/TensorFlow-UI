import {TFNode, widgetStructure} from "../node";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../Components/navbar/navbar.component";
import {lineConnectors} from "../../node-data";

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
			alert("Input node(a) required for the "+ operatorType +" operation");
			return "";
		}
		const link2 = storageLinks.find(element => element.id == this.inputs[1].link);
		if(!link2){
			alert("Input node(b) required for the "+ operatorType +" operation");
			return "";
		}

		const inputNode1 = storageNodes.find(element => element.id == link1?.origin_id);
		const inputNode2 = storageNodes.find(element => element.id == link2?.origin_id);

		res = inputNode1.name;
		res += ","+inputNode2.name;

		let inputNode1DType = inputNode1.widgets.find(element => element.type =="dtype")?.value;
		if(inputNode1DType==undefined){
			inputNode1DType = "float";
		}
		let inputNode2DType = inputNode2.widgets.find(element => element.type =="dtype")?.value;
		if(inputNode2DType==undefined){
			inputNode2DType = "float";
		}

		if(inputNode1DType!==inputNode2DType &&operatorType!=="Pow"){
			alert("The second input node(y) must have the same dtype as the first input(x)");
			return "";
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
}

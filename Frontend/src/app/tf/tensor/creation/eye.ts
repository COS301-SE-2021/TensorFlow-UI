import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFEye extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
	// 	return `${this.name + "= tf.eye(" +
	// 		this.widgets.find(element => element.type == "numRows")?.value || "0" + "," +
	// 		this.widgets.find(element => element.type == "numColumns")?.value || "0" + "," +
	// 		this.widgets.find(element => element.type == "batchShape")?.value || "shape=inferred" + "," +
	// 		this.widgets.find(element => element.type == "dtype")?.value || "dtype=None"
	// })`;
	// }
	//
	// UIStructure(node: LGraphNode) {
	// 	node.addWidget("text", "numRows", 0, (value) => {
	// 		this.changeWidgetValue(value, "numRows");
	// 	});
	// 	node.addWidget("text", "numColumns?", 0, (value) => {
	// 		this.changeWidgetValue(value, "numColumns");
	// 	});
	// 	node.addWidget("text", "batchShape?", "[0,2,4]", (value) => {
	// 		this.changeWidgetValue(value, "batchShape");
	// 	});
	// 	node.addWidget("combo", "dtype(optional)", "float", (value) => {
	// 		this.changeWidgetValue(value, "dtype");
	// 	}, {values: ["float32", "int32", "bool", "complex64", "string"]});
	// 	node.addOutput("tf.Tensor2D", "tf.Tensor2D");
	// }
		let result: string = "";

		let numOfRows = this.widgets.find(element => element.type == "numRows");
		if(numOfRows==undefined)
			result = "1";
		else
			result = numOfRows.value;

		let numColumns = this.widgets.find(element => element.type == "numColumns");
		if(numColumns!=undefined) {
			result+=","+numColumns.value;
		}

		let batchShape = this.widgets.find(element => element.type == "batchShape");
		if(batchShape!=undefined) {
			result+=","+batchShape.value;
		}

		let dType = this.widgets.find(element => element.type == "dtype");
		if(dType!=undefined) {
			result+=","+dType.value;
		}
		this.returnValue = "tf.Tensor2D";

		return `${this.name} = tf.eye(${
			result
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that = this;

		let widgetsData= ["1","0","[0]","float32"];
		let widgetTypes=["numRows","numColumns","batchShape","dtype"];

		for(let i=0; i<4;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text","numRows",widgetsData[0],function (value){
			value = value.trim();
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value, widgetTypes[0], navbar);
			else{
				console.log("Error - 'numRows' can only be a number");
				const link = "https://www.tensorflow.org/api_docs/python/tf/eye?hl=zh-cn";
				//TODO - Throw error
			}
		});
		node.addWidget("text","numColumns(optional)",widgetsData[1],function (value){
			value = value.trim();
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value, widgetTypes[1], navbar);
			else{
				console.log("Error - 'numColumns' can only be a number");
				const link = "https://www.tensorflow.org/api_docs/python/tf/eye?hl=zh-cn";
				//TODO - Throw error
			}
		});
		node.addWidget("text","batchShape(optional)",widgetsData[2],function (value){
			value = value.trim();
			if(that.isBatchShapeCorrect(value))
				that.changeWidgetValue(value,widgetTypes[2],navbar)
		});
		node.addWidget("combo","dtype(optional)",widgetsData[3],function (value){
			that.changeWidgetValue(value,widgetTypes[3],navbar);
		},{values: ["float","float32","int32","bool","complex64","string"]});

		node.addOutput("tf.Tensor2D","tf.Tensor");
		node.size = [240,node.size[1]]
	}

	isBatchShapeCorrect(batchString: string): boolean{
		let errorMessage = "batchShape has to be either [ number ]|[number, number]|[number, number, number]|[number, number, number, number], format inputted is incorrect";
		if(batchString.charAt(0)!=="["){
			console.log(errorMessage)
			return false;
		}
		if(batchString.charAt(batchString.length-1)!==']'){
			console.log(errorMessage)
			return false;
		}
		batchString = batchString.substring(1);
		batchString = batchString.substring(0,batchString.length-1);
		if(batchString.length==0){
			console.log(errorMessage);
			return false;
		}

		for(let i=0; i<4;++i){

			let endBracketIndex = batchString.indexOf(',');
			if(endBracketIndex>-1 && batchString.length>0){
				let numberToTest = batchString.substring(0,endBracketIndex);
				if(!this.checkIfNumber(numberToTest)){
					console.log(errorMessage);
					return false;
				}

				batchString = batchString.substring(endBracketIndex);
				if(batchString.length>1 && batchString.charAt(0)==','){
					batchString = batchString.substring(1);
					if(!this.checkIfNumber(numberToTest)){
						console.log(errorMessage);
						return false;
					}
				}
				else if(batchString.length==1 && batchString.charAt(0)==','){
					let errorMessage2 = "batchShape has to be either [ number ]|[number, number]|[number, number, number]|[number, number, number, number], format inputted is incorrect. Size too long";
					console.log(errorMessage2);
					return false;
				}
			}
			else{
				let numberToTest = batchString;
				if(!this.checkIfNumber(numberToTest)){
					console.log(errorMessage);
					return false;
				}
				return true;
			}
		}
		if(batchString.length>0){
			let errorMessage2 = "batchShape has to be either [ number ]|[number, number]|[number, number, number]|[number, number, number, number], format inputted is incorrect. Size too long";
			console.log(errorMessage2);
			return false;
		}
		else{
			return true;
		}
	}
}

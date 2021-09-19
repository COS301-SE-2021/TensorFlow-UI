import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFVariable extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	// code() {
	// 	let result: string = "";
	//
	// 	let nodeValue: number = 0;
	// 	let constantArg = this.widgets.find(element => element.type == "initialValue");
	// 	if(constantArg==undefined){
	// 		nodeValue = 0;
	// 	}
	// 	else{
	// 		nodeValue = +constantArg.value;
	// 	}
	// 	result+=nodeValue;
	//
	// 	let trainable = this.widgets.find(element => element.type == "trainable");
	// 	if(trainable!=undefined) {
	// 		result+=","+trainable.value;
	// 	}
	//
	// 	let constName = this.widgets.find(element => element.type == "name");
	// 	if(constName!=undefined) {
	// 		result+=","+constName.value;
	// 	}
	//
	// 	let dType = this.widgets.find(element => element.type == "dtype");
	// 	if(dType!=undefined) {
	// 		result+=","+dType.value;
	// 	}
	//
	// 	return `${this.name} = tf.variable(${
	// 		result
	// 	})`;
	// }

	code() {
		return `${this.name} = tf.variable(
			${this.widgets.find(element => element.type == "initialValue")?.value || "0"},
			${this.widgets.find(element => element.type == "trainable")?.value || "false" },
			${this.widgets.find(element => element.type == "name")?.value || "name='Const'"},
			${this.widgets.find(element => element.type == "dtype")?.value || "dtype=None"}  
			

		})`;
	}


	UIStructure(node: LGraphNode) {
		const that = this;
		node.addWidget("text","value",0,function (value){
			that.pushToArray(that.widgets, {type: "value", value: value});
		});
		node.addWidget("toggle","trainable(optional)",false,function (value){
			that.pushToArray(that.widgets, {type: "trainable", value: value});
		},{values: [true,false]})
		node.addWidget("text","name(optional)","name",function (value){
			that.pushToArray(that.widgets, {type: "name", value: value});
		});
		node.addWidget("combo","dtype(optional)","float",function (value){
			that.pushToArray(that.widgets, {type: "dtype", value: value});
		},{values: ["float","float32","int32","bool","complex64","string"]});
		node.addInput("const","tf.Tensor");
		node.addOutput("Variable","tf.Tensor");

		//ToDo: Change how input is viewed
	}
}

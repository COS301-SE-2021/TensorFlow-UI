import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFVariable extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks,storageNodes) {
		let result: string = "";

		// console.log(this.inputs);
		// if(this.inputs.length>0){
		// 	let input = this.inputs[0];
		//
		// 	if(input.link!=null){
		//
		// 	}
		// }

		// let nodeValue: number = 0;
		// let constantArg = this.widgets.find(element => element.type == "constant");
		// if(constantArg==undefined){
		// 	nodeValue = 0;
		// }
		// else{
		// 	nodeValue = +constantArg.value;
		// }
		// result+=nodeValue;
		//
		// let dType = this.widgets.find(element => element.type == "dtype");
		// if(dType!=undefined) {
		// 	result+=","+dType.value;
		// }
		//
		// let shape = this.widgets.find(element => element.type == "shape");
		// if(shape!=undefined) {
		// 	result+=","+shape.value;
		// }
		//
		// let constName = this.widgets.find(element => element.type == "name");
		// if(constName!=undefined) {
		// 	result+=","+constName.value;
		// }


		return `${this.name} = tf.variable(${
			result
		})`;
	}

	UIStructure(node: LGraphNode) {
		const that = this;
		node.addWidget("text","initialValue",0,function (value){
			that.pushToArray(that.widgets, {type: "initialValue", value: value});
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

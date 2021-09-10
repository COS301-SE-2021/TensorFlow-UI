import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {widgetStructure} from "../../node";

export class TFConstant extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(data, name);
	}

	code() {
		let result: string = "";

		let nodeValue: String = "0";
		let constantArg = this.widgets.find(element => element.type == "constant");
		if(constantArg==undefined){
			nodeValue = "0";
		}
		else{
			nodeValue = constantArg.value;
		}
		result+=nodeValue;

		let dType = this.widgets.find(element => element.type == "dtype");
		if(dType!=undefined) {
			result+=","+dType.value;
		}

		let shape = this.widgets.find(element => element.type == "shape");
		if(shape!=undefined) {
			result+=","+shape.value;
		}

		let constName = this.widgets.find(element => element.type == "name");
		if(constName!=undefined) {
			result+=","+constName.value;
		}

		return `${this.name} = tf.constant(${
			result
		})`;
	}

	UIStructure(node: LGraphNode) {
		const that = this;
		node.addWidget("text","constant",0,function (value){
			that.changeWidgetValue(value,"constant");
		});
		node.addWidget("combo","dtype(optional)","float",function (value){
			that.changeWidgetValue(value,"dtype");
		},{values: ["float","float32","int32","bool","complex64","string"]});
		node.addWidget("text","shape(optional)","shape",function (value){
			that.changeWidgetValue(value,"shape")
		});
		node.addWidget("text","name(optional)","name",function (value){
			that.changeWidgetValue(value,"name")});

		node.addOutput("Value","tf.Tensor");
	}

}

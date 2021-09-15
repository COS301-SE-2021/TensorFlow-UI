// tf.rand (shape, randFunction, dtype?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFRand extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.rand(
			${this.widgets.find(element => element.type == "shape")?.value || "shape=inferred"},
			${this.widgets.find(element => element.type == "randFunction")?.value || ""},
			${this.widgets.find(element => element.type == "dtype")?.value || "dtype=None"}
		})`;
	}
	UIStructure(node: LGraphNode){
		node.addWidget("text","shape","[0,2,4]", (value) => {
			this.changeWidgetValue(value,"shape");});
		node.addWidget("text","randFunction","function()", (value) => {
			this.changeWidgetValue(value,"randFunction");});
		node.addWidget("combo","dtype(optional)","float",(value) => {
			this.changeWidgetValue(value,"dtype");
		},{values: ["float32","int32","bool","complex64","string"]});
	}
}

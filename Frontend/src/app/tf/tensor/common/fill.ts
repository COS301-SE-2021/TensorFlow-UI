import { TFTensor } from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFFill extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.fill(
			${this.widgets.find(element => element.type == "value")?.value || "0"},
			${this.widgets.find(element => element.type == "shape")?.value || "shape=inferred"}
			${this.widgets.find(element => element.type == "dtype")?.value || "dtype=None"}
	})`;}

	UIStructure(node: LGraphNode) {
		node.addWidget("text","value",0, (value) => {
			this.changeWidgetValue(value,"value");});
		node.addWidget("text","shape","[0,2,4]", (value) => {
			this.changeWidgetValue(value,"shape");});
		node.addWidget("combo","dtype(optional)","float",(value) => {
			this.changeWidgetValue(value,"dtype");
		},{values: ["float32","int32","bool","complex64","string"]});
		node.addOutput("Fill","tf.Tensor")
		//Todo: Change default width
	}

}

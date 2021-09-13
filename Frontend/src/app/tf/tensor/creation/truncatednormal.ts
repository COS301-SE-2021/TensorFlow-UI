import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFTruncatedNormal extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.truncatedNormal(
			${this.widgets.find(element => element.type == "shape")?.value || "[2,2]"},
			${this.widgets.find(element => element.type == "mean")?.value || ""}
			${this.widgets.find(element => element.type == "stdDev")?.value || ""}
			${this.widgets.find(element => element.type == "dtype")?.value || ""}
			${this.widgets.find(element => element.type == "seed")?.value || ""}
	})`;}

	UIStructure(node: LGraphNode) {
		node.addWidget("text","shape","[0,2]", (value) => {
			this.changeWidgetValue(value,"shape");});
		node.addWidget("text","mean?",0, (value) => {
			this.changeWidgetValue(value,"mean");});
		node.addWidget("text","stdDev?",0, (value) => {
			this.changeWidgetValue(value,"stdDev");});
		node.addWidget("combo","dtype(optional)","float",(value) => {
			this.changeWidgetValue(value,"dtype");
		},{values: ["float32","int32","bool","complex64","string"]});
		node.addWidget("text","seed?",0, (value) => {
			this.changeWidgetValue(value,"seed");});
		node.addOutput("Value","tf.Tensor");
	}
}

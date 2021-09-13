// tf.randomNormal (shape, mean?, stdDev?, dtype?, seed?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFRandomNormal extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.randomNormal(
			${this.widgets.find(element => element.type == "shape")?.value || "shape=inferred"},
			${this.widgets.find(element => element.type == "mean")?.value || ""},
			${this.widgets.find(element => element.type == "stdDev")?.value || "1"},
			${this.widgets.find(element => element.type == "dtype")?.value || "float32"},
			${this.widgets.find(element => element.type == "seed")?.value || ""}
	})`;
	}

	UIStructure(node: LGraphNode){
		node.addWidget("text","shape","[0,2,4]", (value) => {
			this.changeWidgetValue(value,"shape");});
		node.addWidget("text","mean?","2", (value) => {
			this.changeWidgetValue(value,"mean");});
		node.addWidget("text","stdDev?","2", (value) => {
			this.changeWidgetValue(value,"stdDev");});
		node.addWidget("combo","dtype?","float",(value) => {
			this.changeWidgetValue(value,"dtype");
		},{values: ["float32","int32","bool","complex64","string"]});
		node.addWidget("text","seed?","2", (value) => {
			this.changeWidgetValue(value,"seed");});
	}
}

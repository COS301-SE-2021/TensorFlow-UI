import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFTensorTwoD extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name + "= tf.tensor2d(" +
			this.widgets.find(element => element.type == "tensor2d")?.value || "0" + "," +
			this.widgets.find(element => element.type == "shape")?.value || "shape=inferred" + "," +
			this.widgets.find(element => element.type == "dtype")?.value || "dtype=None"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addWidget("text","tensor1d",0, (value) => {
			this.changeWidgetValue(value,"tensor1d");});
		node.addWidget("text","shape","[0,2,4]", (value) => {
			this.changeWidgetValue(value,"shape");});
		node.addWidget("combo","dtype(optional)","float",(value) => {
			this.changeWidgetValue(value,"dtype");
		},{values: ["float32","int32","bool","complex64","string"]});
		node.addOutput("Value","tf.Tensor");
	}
}

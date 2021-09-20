import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFTensorOneD extends TFTensor {
	constructor(public data: number | number[] | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name + "= tf.tensor1d(" +
			this.widgets.find(element => element.type == "tensor1d")?.value || "0" + "," +
			this.widgets.find(element => element.type == "dtype")?.value || "dtype=None"
		})`;
	}

	UIStructure(node: LGraphNode) {
        node.addInput("labels", "tf.Constant");
        node.addInput("features", "tf.Constant");
		node.addWidget("text","tensor1d",0, (value) => {
			this.changeWidgetValue(value,"tensor1d");});
		node.addWidget("combo","dtype(optional)","float",(value) => {
			this.changeWidgetValue(value,"dtype");
		},{values: ["float32","int32","bool","complex64","string"]});
		node.addOutput("Value","tf.Tensor");
	}
}



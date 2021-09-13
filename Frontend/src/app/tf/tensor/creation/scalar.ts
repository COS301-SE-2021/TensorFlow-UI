import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFScalar extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.scalar(
			${this.widgets.find(element => element.type == "scalar")?.value || "0"},
			${this.widgets.find(element => element.type == "dtype")?.value || "dtype=None"}
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addWidget("text","scalar",0, (value) => {
			this.changeWidgetValue(value,"scalar");});
		node.addWidget("combo","dtype(optional)","float",(value) => {
			this.changeWidgetValue(value,"dtype");
		},{values: ["float32","int32","bool","complex64","string"]});
		node.addOutput("Value","tf.Tensor");
	}

}

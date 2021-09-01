import {TFTensor} from "./tensor";
import {LGraphNode} from "litegraph.js";

export class TFConstant extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.constant(${
			this.data || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addWidget("number","constant",0,"constant");
		node.addOutput("Value","tf.Tensor");
	}
}

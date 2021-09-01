import {TFTensor} from "./tensor";
import {LGraphNode} from "litegraph.js";

export class TFZeros extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.zeros(${
			this.data || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addWidget("text","shape","[0,2,4]","zerosShape");
		node.addWidget("combo","dtype(optional)","float","zerosDType",{values: ["float32","int32","bool","complex64","string"]});
		node.addOutput("Tensor zeros","tf.Tensor");
	}
}

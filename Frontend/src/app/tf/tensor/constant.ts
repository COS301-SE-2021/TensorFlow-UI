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
		node.addWidget("combo","dtype(optional)","float","variableDType",{values: ["float32","int32","bool","complex64","string"]});
		node.addWidget("text","shape(optional)","shape","constantID");
		node.addWidget("text","name(optional)","name","constantID");
		node.addOutput("Value","tf.Tensor");
	}
}

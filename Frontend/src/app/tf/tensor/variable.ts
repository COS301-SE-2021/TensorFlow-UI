import {TFTensor} from "./tensor";
import {LGraphNode} from "litegraph.js";

export class TFVariable extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.Variable(${
			this.data || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		// node.addWidget("button", "initialValue", "tf.Tensor","variableName");
		node.addWidget("toggle","trainable(optional)",false,"onDeselected",{values: [true,false]})
		node.addWidget("text","name(optional)","uniqueID","variableID");
		node.addWidget("combo","dtype(optional)","float","variableDType",{values: ["float32","int32","bool","complex64","string"]});
		node.addInput("tf.Tensor","tf.Tensor");
		node.addOutput("Variable","tf.Tensor");

		//ToDo: Change how input is viewed
	}
}

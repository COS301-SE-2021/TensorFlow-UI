import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFBuffer extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		//TODO - return error in code if input is not a number[];

		return `${this.name} = tf.buffer(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode){
		node.addInput("shape","tf.Tensor");
		node.addOutput("tf.TensorBuffer","tf.Tensor"); //TODO - find out if and when this is used as Input
	}
}

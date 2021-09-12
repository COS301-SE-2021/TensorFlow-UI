import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFClone extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.clone(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode){
		node.addInput("X","tf.Tensor");
		node.addOutput("Clone","tf.Tensor");
	}
}

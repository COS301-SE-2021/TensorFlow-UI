// tf.rand (shape, randFunction, dtype?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFRand extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.rand(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode){}
}

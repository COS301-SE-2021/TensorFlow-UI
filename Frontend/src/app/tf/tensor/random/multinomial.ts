// tf.multinomial (logits, numSamples, seed?, normalized?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFMultinomial extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.multinomial(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode){}
}

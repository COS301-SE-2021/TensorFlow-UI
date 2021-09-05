// tf.randomNormal (shape, mean?, stdDev?, dtype?, seed?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFRandomNormal extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.randomNormal(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode){}
}

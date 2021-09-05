// tf.expandDims (x, axis?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFExpandDims extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.expandDims(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode){}
}

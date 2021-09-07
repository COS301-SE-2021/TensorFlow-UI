// tf.squeeze (x, axis?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";


export class TFSqueeze extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.squeeze(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode){}
}

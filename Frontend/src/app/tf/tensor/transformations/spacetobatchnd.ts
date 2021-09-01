// tf.spaceToBatchND (x, blockShape, paddings)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFSpaceToBatchND extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.spaceToBatchND(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode){}
}

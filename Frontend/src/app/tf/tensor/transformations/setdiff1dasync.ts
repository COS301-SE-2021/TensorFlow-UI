// tf.setdiff1dAsync (x, y)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";


export class TFSetdiff1dAsync extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.setdiff1dAsync(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode){}
}

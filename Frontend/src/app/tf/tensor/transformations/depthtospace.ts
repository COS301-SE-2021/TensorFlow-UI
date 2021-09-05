// tf.depthToSpace (x, blockSize, dataFormat?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFDepthToSpace extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.depthToSpace(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode){}
}

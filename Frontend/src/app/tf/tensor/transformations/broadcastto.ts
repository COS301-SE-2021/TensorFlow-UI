// tf.broadcastTo (x, shape)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";


export class TFBroadcastTo extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.batchToSpaceND(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode){}
}

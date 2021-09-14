import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFOnesLike extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.oneslike(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link)})`;
	}


	UIStructure(node: LGraphNode){
		node.addInput("X","tf.Tensor");
		node.addOutput("tf.Tensor","tf.Tensor");
	}
}

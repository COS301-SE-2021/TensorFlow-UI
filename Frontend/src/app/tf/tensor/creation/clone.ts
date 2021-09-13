import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFClone extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name} = ${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)}.tf.clone()`;
	}

	UIStructure(node: LGraphNode){
		node.addInput("X", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("Clone X", "tf.Tensor");
	}
}

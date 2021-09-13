import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFImag extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name} = tf.imag(
	${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)})`;
	}

	UIStructure(node: LGraphNode){
		node.addInput("X","tf.Tensor");
		node.addOutput("tf.Tensor","tf.Tensor");
	}
}

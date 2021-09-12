import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFImag extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks,storageNodes) {
		let param: string = "0";

		let input = this.inputs[0];
		if(input.link!=null){

			const link = storageLinks.find(element => element.id ==input.link);
			const inputNode = storageNodes.find(element => element.id == link.origin_id);

			param = inputNode.name;
		}

		return `${this.name} = tf.imag(${param})`;
	}
	UIStructure(node: LGraphNode){
		node.addInput("X","tf.Tensor");
		node.addOutput("tf.Tensor","tf.Tensor");
	}
}

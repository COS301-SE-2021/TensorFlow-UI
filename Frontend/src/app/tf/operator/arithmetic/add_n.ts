import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFAddN extends TFOperator {
	constructor(
		public name: string | undefined = undefined,
	) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		// Adds a list of tf.Tensors element-wise, each with the same shape and dtype.
		// A list of tensors with the same shape and dtype.

		let param: string = "0";

		let input = this.inputs[0];
		if(input.link!=null){

			const link = storageLinks.find(element => element.id ==input.link);
			const inputNode = storageNodes.find(element => element.id == link.origin_id);

			param = inputNode.name;
		}

		return `${this.name} = tf.math.add_n(${param})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("text","Array");
		node.addOutput("Tensor list","tf.Tensor");
	}
}

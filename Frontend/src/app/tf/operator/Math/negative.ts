import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFNegative extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let input = this.inputs[0];
		let param1: String = "";

		if(input.link==null){
			let errorMessage = "The Negative Node is binary and requires an input inorder to obtain a result";
			let docsLink = "https://www.tensorflow.org/api_docs/python/tf/math/negative";
			console.log(errorMessage);
		}
		else{
			const link = storageLinks.find(element => element.id ==input.link);
			const inputNode = storageNodes.find(element => element.id == link.origin_id);

			param1 = inputNode.name;
		}

		return `${this.name} = tf.math.negative(${param1})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A", "tf.Tensor");
		node.addOutput("-(A)", "tf.Tensor");
	}
}

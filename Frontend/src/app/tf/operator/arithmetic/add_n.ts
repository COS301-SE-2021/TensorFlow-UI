import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFAddN extends TFOperator {
	constructor(
		public name: string | undefined = undefined,
	) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let param: string = "0";

		let input = this.inputs[0];
		if(input.link!=null){

			const link = storageLinks.find(element => element.id ==input.link);
			const inputNode = storageNodes.find(element => element.id == link.origin_id);

			param = inputNode.name;
			if(!param) {
				alert("Input node(x) required for the addN operation")
				return;
			}
		}
		else {
			alert("Input node(x) required for the addN operation")
			return;
		}

		return `${this.name} = tf.math.add_n(${param})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x","tf.Tensor");
		node.addOutput("tf.Tensor","tf.Tensor");
	}
}

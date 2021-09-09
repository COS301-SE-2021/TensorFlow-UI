import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMod extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		let param1: string = "1";
		let param2: string = "1";

		for(let i=0; i<this.inputs.length; ++i){
			let input = this.inputs[i];
			if(input.link!=null){

				const link = storageLinks.find(element => element.id ==input.link);
				const inputNode = storageNodes.find(element => element.id == link.origin_id);

				if(i==0) {
					param1 = inputNode.name;
				}
				else {
					param2 = inputNode.name;
				}
			}
		}

		return `${this.name} = tf.math.mod(${param1},${param2})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A","tf.Tensor");
		node.addInput("B","tf.Tensor");
		node.addOutput("A%B","tf.Tensor");
	}
}

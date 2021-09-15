import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFOuterProduct extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes){
		return `${this.name + "tf.dot("+
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link)+","+
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link)+")"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("v1", "tf.Tensor");
		node.addInput("v2", "tf.Tensor");
		node.addOutput("v1.v2 outer product", "tf.Tensor");
	}

}

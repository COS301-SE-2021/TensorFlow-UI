import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFDot extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes){
		return `${this.name} = tf.dot(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
			${this.GetNode(storageLinks, storageNodes, this.inputs[1].link)},
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("t1", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("t2", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("t1.t2", "tf.Tensor");
	}

}


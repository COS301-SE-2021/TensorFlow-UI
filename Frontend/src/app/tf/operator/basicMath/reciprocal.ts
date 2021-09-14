import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFReciprocal extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.math.reciprocal("+
		this.GetNode(storageLinks, storageNodes, this.inputs[0].link)})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor");
		node.addOutput("1/x", "tf.Tensor");
	}
}

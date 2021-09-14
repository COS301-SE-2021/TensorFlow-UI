import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFSoftplus extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name} = tf.math.softplus(
		${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("log(exp(x) + 1)", "tf.Tensor");
	}
}

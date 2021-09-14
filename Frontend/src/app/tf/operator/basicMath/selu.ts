import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFSelu extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.nn.selu("+
		this.GetNode(storageLinks, storageNodes, this.inputs[0].link)})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("x<0 ? scale*alpha*(exp(x) - 1) : x", "tf.Tensor");
	}
}

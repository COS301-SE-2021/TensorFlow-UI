import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFLessEqual extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "=" + this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + ".lessEqual(" +
		this.GetNode(storageLinks, storageNodes, this.inputs[1].link)})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("B", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("lessEqual", "tf.Tensor");
	}
}

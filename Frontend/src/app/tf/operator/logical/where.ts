import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFWhere extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "=" + this.GetNode(storageLinks, storageNodes, this.inputs[1].link) + ".where(" +
		this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
		this.GetNode(storageLinks, storageNodes, this.inputs[2].link)}
		)`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("Condition", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("A", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("B", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("where", "tf.Tensor");
	}
}

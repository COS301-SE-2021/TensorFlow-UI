import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFElu extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.nn.elu("+
		this.GetNode(storageLinks, storageNodes, this.inputs[0].link)})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput(" x>0? e^x-1:0.", "tf.Tensor");
	}
}

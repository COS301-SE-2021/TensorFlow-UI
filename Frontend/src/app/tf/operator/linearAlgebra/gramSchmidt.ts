import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFGramSchmidt extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.linalg.gramSchmidt(" +
		this.GetNode(storageLinks, storageNodes, this.inputs[0].link)})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("xs", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("gramSchmidt", "tf.Tensor"); // tf.Tensor1D[]|tf.Tensor2D
	}
}

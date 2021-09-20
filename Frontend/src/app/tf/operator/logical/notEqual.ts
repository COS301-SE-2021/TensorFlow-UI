import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFNotEqual extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		let result = this.genericOperatorCode(storageLinks,storageNodes,"not_equal");
		if(result==""){
			return;
		}
		return `${this.name + "= tf.math.not_equal("+
			result+
		")"}`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("a", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("b", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("a != b", "tf.Tensor");
	}
}

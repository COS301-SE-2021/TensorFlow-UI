import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFGreater extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		let result = this.genericOperatorCode(storageLinks,storageNodes,"greater");
		if(result==""){
			return;
		}
		return `${this.name + "= tf.math.greater("+
			result+
		")"}`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("a", "tf.Tensor")
		node.addInput("b", "tf.Tensor");
		node.addOutput("a > b", "tf.Tensor");
	}
}

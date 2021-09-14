import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFLess extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		let result = this.genericOperatorCode(storageLinks,storageNodes,"less");
		if(result==""){
			return;
		}
		return `${this.name + "= tf.math.less("+
			result+
		")"}`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("a", "tf.Tensor");
		node.addInput("b", "tf.Tensor");
		node.addOutput("a < b", "tf.Tensor");
	}
}

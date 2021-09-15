import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFLogicalAnd extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		let result = this.genericLogicGateOperatorsCode(storageLinks,storageNodes,"logical_and");
		if(result==""){
			return;
		}
		return `${this.name + "= tf.math.logical_and("+
			result+
		")"}`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("a", "tf.Tensor");
		node.addInput("b", "tf.Tensor");
		node.addOutput("a AND b", "tf.Tensor");
	}
}

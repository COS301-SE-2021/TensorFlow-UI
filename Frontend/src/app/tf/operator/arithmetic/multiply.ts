import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMultiply extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let res = this.genericArithmeticCode(storageLinks,storageNodes,"Multiply");
		if(res=="")
			return;

		return `${this.name + "= tf.math.multiply("+
		res
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("a", "tf.Tensor");
		node.addInput("b", "tf.Tensor");
		node.addOutput("a*b", "tf.Tensor");
	}
}

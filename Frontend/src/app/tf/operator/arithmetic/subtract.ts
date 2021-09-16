import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFSubtract extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let res = this.genericArithmeticCode(storageLinks,storageNodes,"Subtract");
		if(res=="")
			return;

		return `${this.name + "= tf.math.subtract("+
		res
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("a","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("b","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("a-b","tf.Tensor");
	}
}

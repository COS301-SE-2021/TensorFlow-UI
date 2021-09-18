import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMod extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let res = this.genericArithmeticCode(storageLinks,storageNodes,"Mod");
		if(res=="")
			return;

		return `${this.name + "= tf.math.floormod("+
		res
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("a", "tf.Tensor");
		node.addInput("b", "tf.Tensor");
		node.addOutput(" floor(x/y) *y + mod(x,y) ", "tf.Tensor");
	}
}

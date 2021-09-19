import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {Store} from "@ngxs/store";

export class TFDivide extends TFOperator {
	constructor(public name: string | undefined = undefined,private store: Store) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let res = this.genericArithmeticCode(storageLinks,storageNodes,"Divide");
		if(res=="")
			return;

		return `${this.name + "= tf.math.divide("+
		res
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("a", "tf.Tensor");
		node.addInput("b", "tf.Tensor");
		node.addOutput("a/b", "tf.Tensor");
	}
}

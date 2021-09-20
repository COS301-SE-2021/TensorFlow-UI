import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

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

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("a","tf.Tensor");
		node.addInput("b","tf.Tensor");
		this.createNodeNameWidget(node,navbar);
		node.addOutput("a-b","tf.Tensor");
	}
}

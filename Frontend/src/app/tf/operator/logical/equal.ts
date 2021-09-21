import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";
import {TFNode} from "../../node";

export class TFEqual extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let result = this.genericOperatorCode(storageLinks,storageNodes,"equal");
		if(result==""){
			return;
		}
		return `${this.name + "= tf.math.equal("+
			result+
		")"}`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("a", "tf.Tensor");
		node.addInput("b", "tf.Tensor");
		node.addOutput("a == b", "tf.Tensor");
	}
}

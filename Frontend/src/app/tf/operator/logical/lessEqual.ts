import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFLessEqual extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		let result = this.genericOperatorCode(storageLinks,storageNodes,"less_equal");
		if(result==""){
			return;
		}
		return `${this.name + "= tf.math.less_equal("+
			result+
		")"}`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("a", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("b", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("a <= b", "tf.Tensor");
	}
}

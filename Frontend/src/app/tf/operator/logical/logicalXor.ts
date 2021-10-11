import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFLogicalXor extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let result = this.genericLogicGateOperatorsCode(storageLinks,storageNodes,"logical_xor");
		if(result==""){
			return;
		}
		return `${this.name + "= tf.math.logical_xor("+
			result+
		")"}`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("a", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("b", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("a XOR b", "tf.Tensor");
		node.addWidget("text","name",this.name,(value) => {
			this.changeWidgetValue(value,"name",navbar,node);
		});
	}
}

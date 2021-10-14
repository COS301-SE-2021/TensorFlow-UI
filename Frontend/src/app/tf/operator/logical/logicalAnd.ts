import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

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

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("a", "tf.Tensor");
		node.addInput("b", "tf.Tensor");
		node.addOutput("a AND b", "tf.Tensor");
		node.addWidget("text","name",this.name,(value) => {
			this.changeWidgetValue(value,"name",navbar,node);
		});
	}
}

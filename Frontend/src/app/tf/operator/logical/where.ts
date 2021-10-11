import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFWhere extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "=" + this.GetNode(storageLinks, storageNodes, this.inputs[1].link) + ".where(" +
		this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
		this.GetNode(storageLinks, storageNodes, this.inputs[2].link)}
		)`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("Condition", "tf.Tensor");
		node.addInput("A", "tf.Tensor");
		node.addInput("B", "tf.Tensor");
		node.addOutput("where", "tf.Tensor");
		node.addWidget("text","name",this.name,(value) => {
			this.changeWidgetValue(value,"name",navbar,node);
		});
	}
}
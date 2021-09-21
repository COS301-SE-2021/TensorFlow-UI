import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFInTopAsync extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.inTopAsync(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link) + "," +
			this.widgets.find(element => element.type == "value")?.value || ""}
		)`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("predictions", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("targets", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","k",0, (value) => {
			this.changeWidgetValue(value,"value");});
		node.addOutput("inTopAsync", "tf.Tensor");
	}
}

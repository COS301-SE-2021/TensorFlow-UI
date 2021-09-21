import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFTopk extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.topk(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.widgets.find(element => element.type == "value")?.value || ""  + "," +
			this.widgets.find(element => element.type == "sorted")?.value || ""}
		)`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","k",0, (value) => {
			this.changeWidgetValue(value,"value");});
		node.addWidget("toggle","sorted",false, (value) => {
			this.pushToArray(this.widgets, {type: "sorted", value: value});
		},{values: [true,false]})
		node.addOutput("topk", "tf.Tensor");
	}
}

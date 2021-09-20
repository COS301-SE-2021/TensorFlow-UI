import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFUnique extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.unique(" + 
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link)  + "," +
			this.widgets.find(element => element.type == "axis")?.value || ""}
		)`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","axis",0, (value) => {
			this.changeWidgetValue(value,"value");});
		node.addOutput("unique", "tf.Tensor");
	}
}

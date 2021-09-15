import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFBincount extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.bincount(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link) + "," +
			this.widgets.find(element => element.type == "weights")?.value || "" + "," +
			this.widgets.find(element => element.type == "size")?.value || ""
	})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("weights", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text", "size", "", (value) => {
			this.changeWidgetValue(value, "size");
		});
		node.addOutput("tf.Tensor", "tf.Tensor");
	}
}

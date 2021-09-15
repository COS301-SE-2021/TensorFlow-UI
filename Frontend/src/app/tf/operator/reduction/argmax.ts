import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFArgMax extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.argMax(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.widgets.find(element => element.type == "axis")?.value || ""
	})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("combo", "axis", "float", (value) => {
			this.changeWidgetValue(value, "axis");
		});
		node.addOutput("tf.Tensor", "tf.Tensor");
	}
}

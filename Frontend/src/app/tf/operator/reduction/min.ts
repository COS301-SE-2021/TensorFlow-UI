import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMin extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.min(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.widgets.find(element => element.type == "axis")?.value || "" + "," +
			this.widgets.find(element => element.type == "keepDims")?.value || ""
	})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("combo", "axis", "float", (value) => {
			this.changeWidgetValue(value, "axis");
		});
		node.addWidget("toggle", "keepDims?", true, (value) => {
			this.changeWidgetValue(value, "keepDims")
		}, {values: [true, false]});
		node.addOutput("tf.Tensor", "tf.Tensor");
	}
}

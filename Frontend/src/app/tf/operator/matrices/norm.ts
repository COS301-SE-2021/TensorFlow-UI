import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFNorm extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.norm(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.widgets.find(element => element.type == "ord")?.value || "" + "," +
			this.widgets.find(element => element.type == "axis")?.value || "" + "," +
			this.widgets.find(element => element.type == "keepDims")?.value || ""}
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text", "ord?", "", (value) => {
			this.changeWidgetValue(value, "ord");
		});
		node.addWidget("text", "axis?", "", (value) => {
			this.changeWidgetValue(value, "axis");
		});
		node.addWidget("text", "keepDims?", "", (value) => {
			this.changeWidgetValue(value, "keepDims");
		});
		node.addOutput("", "tf.Tensor");
	}

}

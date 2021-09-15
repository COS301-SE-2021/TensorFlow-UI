import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMoments extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.moments(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.widgets.find(element => element.type == "axis")?.value || "" + "," +
			this.widgets.find(element => element.type == "keepDims")?.value || ""
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text", "axis?", "", (value) => {
			this.changeWidgetValue(value, "axis");
		});
		node.addWidget("toggle","keepDims?",false, (value) => {
			this.pushToArray(this.widgets, {type: "trainable", value: value});
		},{values: [true,false]})
		node.addOutput("tf.Tensor", "tf.Tensor");
	}

}

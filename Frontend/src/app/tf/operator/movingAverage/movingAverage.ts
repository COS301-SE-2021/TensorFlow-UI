import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMovingAverage extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.movingAverage(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[2].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[3].link) || "" + "," +
			this.widgets.find(element => element.type == "zeroDebias")?.value || ""
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("v", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("decay", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("step", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("toggle", "zeroDebias?", true,  (value) => {
			this.changeWidgetValue(value, "zeroDebias")
		}, {values: [true, false]});
		node.addOutput("", "tf.Tensor");
	}
}

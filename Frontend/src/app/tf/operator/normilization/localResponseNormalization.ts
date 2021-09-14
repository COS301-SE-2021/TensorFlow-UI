import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFLocalResponseNormalization extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.localResponseNormalization(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.widgets.find(element => element.type == "depthRadius")?.value || "" + "," +
			this.widgets.find(element => element.type == "bias")?.value || "" + "," +
			this.widgets.find(element => element.type == "alpha")?.value || "" + "," +
			this.widgets.find(element => element.type == "beta")?.value || ""
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text", "depthRadius?", "", (value) => {
			this.changeWidgetValue(value, "depthRadius");
		});
		node.addWidget("text", "bias?", "", (value) => {
			this.changeWidgetValue(value, "bias");
		});
		node.addWidget("text", "alpha?", "", (value) => {
			this.changeWidgetValue(value, "alpha");
		});
		node.addWidget("text", "beta?", "", (value) => {
			this.changeWidgetValue(value, "beta");
		});
		node.addOutput("tf.Tensor", "tf.Tensor"); //Returns: tf.Tensor3D|tf.Tensor4D
	}

}

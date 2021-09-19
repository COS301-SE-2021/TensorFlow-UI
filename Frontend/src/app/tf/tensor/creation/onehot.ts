import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFOneHot extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.oneHot(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.widgets.find(element => element.type == "value")?.value || "0" + "," +
			this.widgets.find(element => element.type == "shape")?.value || "" + "," +
			this.widgets.find(element => element.type == "dtype")?.value || ""
	})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("indices", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text", "depth", 0, (value) => {
			this.changeWidgetValue(value, "value");
		});
		node.addWidget("text", "onValue?", "", (value) => {
			this.changeWidgetValue(value, "onValue");
		});
		node.addWidget("combo", "offValue?", "", (value) => {
			this.changeWidgetValue(value, "offValue");
		});
		node.addOutput("Value", "tf.Tensor");
	}
}

import {TFLayers} from "../layers";
import {LGraphNode} from "litegraph.js";

export class TFConv2dTranspose extends TFLayers {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name} = tf.layers.conv2dTranspose(
			${this.widgets.find(element => element.type == "constant")?.value || "0"},
	})`;
	}

	UIStructure(node: LGraphNode) {
		const that = this;
		node.addWidget("text", "constant", 0, function (value) {
			that.changeWidgetValue(value, "constant");
		});
	}
}

import {TFLayers} from "../layers";
import {LGraphNode} from "litegraph.js";

export class TFUpSampling2d extends TFLayers {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name} = tf.layers.upSampling2d(
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
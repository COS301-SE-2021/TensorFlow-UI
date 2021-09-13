import {TFLayers} from "../layers";
import {LGraphNode} from "litegraph.js";

export class TFPermute extends TFLayers {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(name);
	}

	code() {
		return `${this.name} = tf.layers.permute(
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

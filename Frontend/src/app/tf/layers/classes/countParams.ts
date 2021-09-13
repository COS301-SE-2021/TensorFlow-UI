import {TFLayers} from "../layers";
import {LGraphNode} from "litegraph.js";

export class TFCountParams extends TFLayers {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name} = tf.layers.countParams(
			${this.widgets.find(element => element.type == "value")?.value || "0"},
	})`;
	}

	UIStructure(node: LGraphNode) {
		node.addWidget("text", "value", 0, (value) => {
			this.changeWidgetValue(value, "value");
		});
		node.addOutput("tf.layers.Layer","tf.layers.Layer");
	}
}

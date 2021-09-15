import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

// tf.cumsum (x, axis?, exclusive?, reverse?)

export class TFCumsum extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.cumsum("
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("", "");
		node.addWidget("text", "", "", (value) => {
			this.changeWidgetValue(value, "");
		});
		node.addOutput("", "");
	}

}

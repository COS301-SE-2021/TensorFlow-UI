import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFNonMaxSuppressionAsync extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.image.nonMaxSuppressionAsync("
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

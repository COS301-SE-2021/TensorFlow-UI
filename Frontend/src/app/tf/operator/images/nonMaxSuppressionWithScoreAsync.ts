import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFNonMaxSuppressionWithScoreAsync extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.image.nonMaxSuppressionWithScoreAsync("
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

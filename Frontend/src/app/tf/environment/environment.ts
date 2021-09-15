import {TFNode} from "../node";
import {LGraphNode} from "litegraph.js";

export class TFEnvironment extends TFNode {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(name, "Environment", data);
	}

	code(storageLinks, storageNodes) {
// tf.Environment
	}

	UIStructure(node: LGraphNode) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

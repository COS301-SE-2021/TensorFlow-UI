import { TFEnvironment } from ".";
import {LGraphNode} from "litegraph.js";

export class TFEngine extends TFEnvironment {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
// tf.engine
	}

	UIStructure(node: LGraphNode) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

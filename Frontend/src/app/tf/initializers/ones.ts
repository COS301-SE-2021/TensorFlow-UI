import {TFInitializer} from "./initializer";
import {LGraphNode} from "litegraph.js";

export class TFOnes extends TFInitializer {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
// tf.initializers.ones
	}

	UIStructure(node: LGraphNode) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

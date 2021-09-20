import { TFEnvironment } from ".";
import {LGraphNode} from "litegraph.js";

export class TFEnableProdMode extends TFEnvironment {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
		// tf.enableProdMode
	}

	UIStructure(node: LGraphNode) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

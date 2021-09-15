import {TFNode} from "../node";
import {LGraphNode} from "litegraph.js";

export class TFInitializer extends TFNode {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(name, "Initializer", data);
	}

	code(storageLinks, storageNodes) {

	}

	UIStructure(node: LGraphNode) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

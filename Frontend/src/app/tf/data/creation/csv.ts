import {TFData} from "../data";
import {LGraphNode} from "litegraph.js";

export class TFCSV extends TFData {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
// tf.data.csv
	}

	UIStructure(node: LGraphNode) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

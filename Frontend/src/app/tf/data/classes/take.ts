import {TFData} from "../data";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFTake extends TFData {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
		// tf.data.Dataset.take
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

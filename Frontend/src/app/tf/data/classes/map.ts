import {TFData} from "../data";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFMap extends TFData {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
		// tf.data.Dataset.map
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

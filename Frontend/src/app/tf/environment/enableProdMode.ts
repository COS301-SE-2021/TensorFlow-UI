import { TFEnvironment } from ".";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../Components/navbar/navbar.component";;

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

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

import {TFInitializer} from "./initializer";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../Components/navbar/navbar.component";

export class TFIdentity extends TFInitializer {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
// tf.initializers.identity
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

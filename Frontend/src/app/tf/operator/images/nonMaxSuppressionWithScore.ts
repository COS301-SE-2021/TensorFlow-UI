import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFNonMaxSuppressionWithScore extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.image.nonMaxSuppressionWithScore("
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("", "");
		node.addOutput("", "");
	}
}

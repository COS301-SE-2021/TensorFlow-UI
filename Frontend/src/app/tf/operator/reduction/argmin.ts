import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFArgMin extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {

		let res = this.genericReductionArgsCode(storageLinks,storageNodes,"ArgMin");
		if(res=="")
			return;

		return `${this.name + "= tf.math.argmin("+
		res
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		this.genericReductionArgsUIStructure(node,navbar);
	}
}

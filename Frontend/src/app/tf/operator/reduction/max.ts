import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFMax extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {

		let res = this.genericReductionCode(storageLinks,storageNodes,"Reduce Max");
		if(res=="")
			return;

		return `${this.name + "= tf.math.reduce_max("+
			res
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		this.genericReductionUIStructure(node,navbar);
	}
}

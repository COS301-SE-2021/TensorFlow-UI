import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFMean extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {

		let res = this.genericReductionCode(storageLinks,storageNodes,"Reduce Mean");
		if(res=="")
			return;

		return `${this.name + "= tf.math.reduce_mean("+
			res
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		this.genericReductionUIStructure(node,navbar);
	}
}

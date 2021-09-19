import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFZeros extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return this.onesAndZerosCode("zeros");
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent){
		this.onesAndZerosUIStructure(node,navbar);
	}
}

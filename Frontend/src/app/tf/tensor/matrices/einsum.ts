// tf.einsum (equation, ...tensors)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFEinsum extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.einsum(${
			this.data || "some value"
		})`;
	}
	UIStructure(node: LGraphNode,navbar?:NavbarComponent){}
}

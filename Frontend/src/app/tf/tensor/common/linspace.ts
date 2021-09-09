import { TFTensor } from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFLinespace extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.linespace(${
			this.data || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addWidget("number","start",0,"linspaceStart");
		node.addWidget("number","stop",0,"linspaceStop");
		node.addWidget("number","num",1,"linspaceNum");
		node.addOutput("linspace sequence","tf.Tensor");
	}
}

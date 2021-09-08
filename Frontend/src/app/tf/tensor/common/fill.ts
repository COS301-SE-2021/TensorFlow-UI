import { TFTensor } from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFFill extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.fill(${
			this.data || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addWidget("text","shape","[0,4,2]","fillShape");
		node.addWidget("text","value",0,"fillShape");
		node.addWidget("combo","dtype(optional)","float","fillDType",{values: ["float32","int32","bool","complex64","string"]});
		node.addOutput("Fill","tf.Tensor")
		//Todo: Change default width
	}

}

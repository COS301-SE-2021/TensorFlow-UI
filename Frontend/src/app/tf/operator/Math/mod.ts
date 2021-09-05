import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMod extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.mod(
			${!(this.TFChildInputs) || this.TFChildInputs[0]?.name || "some value"},
			${!(this.TFChildInputs) || this.TFChildInputs[1]?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A","tf.Tensor");
		node.addInput("B","tf.Tensor");
		node.addOutput("A%B","tf.Tensor");
	}
}

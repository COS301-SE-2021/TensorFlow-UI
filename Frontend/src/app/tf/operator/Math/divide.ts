import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFDivide extends TFOperator {
	constructor(
		public name: string | undefined = undefined
	) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.divide(
			${this.TFChildInputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A", "tf.Tensor");
		node.addInput("B", "tf.Tensor");
		node.addOutput("A/B", "tf.Tensor");
	}
}

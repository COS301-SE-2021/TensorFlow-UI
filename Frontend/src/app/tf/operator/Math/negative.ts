import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFNegative extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.negative(
			${this.inputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A", "tf.Tensor");
		node.addOutput("-(A)", "tf.Tensor");
	}
}

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFSigmoid extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.sigmoid(
			${this.TFChildInputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("X","tf.Tensor");
		node.addOutput("1/1+exp(-x)", "tf.Tensor");
	}
}

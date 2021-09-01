import {TFOperator} from "../operator";
import {TFNode} from "../../node";
import {LGraphNode} from "litegraph.js";

export class TFDivide extends TFOperator {
	constructor(
		public name: string | undefined = undefined
	) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.divide(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A","tf.Tensor");
		node.addInput("B","tf.Tensor");
		node.addOutput("A/B","tf.Tensor");
	}
}

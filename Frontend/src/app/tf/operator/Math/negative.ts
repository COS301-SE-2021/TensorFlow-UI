import {TFOperator} from "../operator";
import {TFNode} from "../../node";
import {LGraphNode} from "litegraph.js";

export class TFNegative extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.negative(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A","tf.Tensor");
		node.addOutput("-(A)","tf.Tensor");
	}
}

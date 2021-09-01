import {TFOperator} from "../operator";
import {TFNode} from "../../node";
import {LGraphNode} from "litegraph.js";

export class TFScalarMul extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.scalar_mul(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {}
}

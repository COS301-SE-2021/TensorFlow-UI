// tf.model (args)

import {LGraphNode} from "litegraph.js";
import {TFOperator} from "../../operator";

export class TFModel extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code() {
		// return `${this.name} = tf.model(
		// ${this.childOne?.name || "some value"},
		// ${this.childTwo?.name || "some value"
		// })`;
	}

	UIStructure(node: LGraphNode) {
		// node.addInput("A","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		// node.addInput("B","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		// node.addOutput("A+B","tf.Tensor");
	}
}
import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFAddN extends TFOperator {
	constructor(
		public name: string | undefined = undefined,
	) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.add_n(
			${this.inputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("tensors(Array)","Array"); //ToDo: Ensure this array can receive a sample array, must be same shape and dtype
		node.addOutput("Tensor list","tf.Tensor");
	}
}

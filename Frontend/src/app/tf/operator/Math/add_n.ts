import {TFOperator} from "../operator";
import {TFNode} from "../../node";
import {LGraphNode} from "litegraph.js";

export class TFAddN extends TFOperator {
	constructor(
		public name: string | undefined = undefined,
		public args: TFNode[] | undefined = undefined,
	) {
		super(name);
	}

	code() {
		let attributes: string = "";
		for (let argsKey in this.args) {
			attributes += this.args[argsKey].name + ","
		}
		return `${this.name} = tf.math.add_n(
		${attributes || "some value"},
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("tensors(Array)","Array"); //ToDo: Ensure this array can receive a sample array, must be same shape and dtype
		node.addOutput("Tensor list","tf.Tensor");
	}
}

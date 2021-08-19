import {TFOperator} from "../operator";
import {TFNode} from "../../node";

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
}

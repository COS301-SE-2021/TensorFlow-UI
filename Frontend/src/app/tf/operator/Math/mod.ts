import {TFOperator} from "../operator";
import {TFNode} from "../../node";

export class TFMod extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.mod(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}
}

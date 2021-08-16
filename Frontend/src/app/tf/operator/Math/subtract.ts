import {TFOperator} from "../operator";
import {TFNode} from "../../node";

export class TFSubtract extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.subtract(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}
}

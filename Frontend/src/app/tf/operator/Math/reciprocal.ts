import {TFOperator} from "../operator";
import {TFNode} from "../../node";

export class TFReciprocal extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.reciprocal(
		${this.childOne?.name || "some value"}
		})`;
	}
}

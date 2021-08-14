import {TFOperator} from "../operator";
import {TFNode} from "../../node";

export class TFReciprocal extends TFOperator {
	constructor(
		public x: TFNode | undefined = undefined
	) {
		super();
	}

	code() {
		return `${this.name} = tf.math.reciprocal(
		${this.x?.name || "some value"}
		})`;
	}
}

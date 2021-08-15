import {TFOperator} from "../operator";
import {TFNode} from "../../node";

export class TFMod extends TFOperator {
	constructor(
		public x: TFNode | undefined = undefined,
		public y: TFNode | undefined = undefined
	) {
		super();
	}

	code() {
		return `${this.name} = tf.math.mod(
		${this.x?.name || "some value"},
		${this.y?.name || "some value"
		})`;
	}
}

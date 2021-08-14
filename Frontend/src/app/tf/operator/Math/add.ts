import {TFOperator} from "../operator";
import {TFNode} from "../../node";

export class TFAdd extends TFOperator {
	constructor(
		public name: string | undefined = undefined,
		public x: TFNode | undefined = undefined,
		public y: TFNode | undefined = undefined
	) {
		super(name, x, y);
	}

	code() {
		return `${this.name} = tf.math.add(
		${this.x?.name || "some value"},
		${this.y?.name || "some value"
		})`;
	}
}

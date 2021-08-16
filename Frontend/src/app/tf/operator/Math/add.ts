import {TFOperator} from "../operator";

export class TFAdd extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.add(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}
}

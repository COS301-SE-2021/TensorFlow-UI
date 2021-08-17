import {TFOperator} from "../operator";
import {TFNode} from "../../node";

export class TFSigmoid extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code() {
		return `${this.name} = tf.math.sigmoid(${this.childOne?.name || "some value"})`;
	}
}

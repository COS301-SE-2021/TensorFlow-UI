import {TFOperator} from "../operator";
import {TFNode} from "../../node";

export class TFSigmoid extends TFOperator {
	constructor(public x: TFNode | undefined = undefined) {
		super();
	}

	code() {
		return `${this.name} = tf.math.sigmoid(${this.x?.name || "some value"})`;
	}
}

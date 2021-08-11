import {TFTensor} from "./tensor";

export class TFVariable extends TFTensor {
	constructor() {
		super();
	}

	code() {
		return `${this.name} = tf.Variable(${
			this.data?.toFixed(2) || "some value"
		})`;
	}
}

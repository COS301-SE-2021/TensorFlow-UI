import { TFTensor } from "./tensor";

export class TFConstant extends TFTensor {
	constructor() {
		super();
	}

	code() {
		return `${this.name} = tf.constant(${
			this.data?.toFixed(2) || "some value"
		})`;
	}
}

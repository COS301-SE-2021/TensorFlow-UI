import { TFTensor } from "./tensor";

export class TFZeros extends TFTensor {
	constructor() {
		super();
	}

	code() {
		return `${this.name} = tf.zeros(${
			this.data?.toFixed(2) || "some value"
		})`;
	}
}

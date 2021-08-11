import { TFTensor } from "./tensor";

export class TFFill extends TFTensor {
	constructor() {
		super();
	}

	code() {
		return `${this.name} = tf.fill(${
			this.data?.toFixed(2) || "some value"
		})`;
	}
}

import { TFTensor } from "./tensor";

export class TFOnes extends TFTensor {
	constructor() {
		super();
	}

	code() {
		return `${this.name} = tf.ones(${
			this.data?.toFixed(2) || "some value"
		})`;
	}
}

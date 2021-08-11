import { TFTensor } from "./tensor";

export class TFLinespace extends TFTensor {
	constructor() {
		super();
	}

	code() {
		return `${this.name} = tf.linespace(${
			this.data?.toFixed(2) || "some value"
		})`;
	}
}

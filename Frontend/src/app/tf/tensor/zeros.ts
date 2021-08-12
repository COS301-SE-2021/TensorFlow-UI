import {TFTensor} from "./tensor";

export class TFZeros extends TFTensor {
	constructor(public data: Number | undefined = undefined,
				public name: String | undefined = undefined) {
		super(data, name, 1);
	}

	code() {
		return `${this.name} = tf.zeros(${
			this.data?.toFixed(2) || "some value"
		})`;
	}
}

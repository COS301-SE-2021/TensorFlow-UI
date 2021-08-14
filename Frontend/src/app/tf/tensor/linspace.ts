import { TFTensor } from "./tensor";

export class TFLinespace extends TFTensor {
	constructor(public data: Number | undefined = undefined,
				public name: String | undefined = undefined) {
		super(data, name, 1);
	}

	code() {
		return `${this.name} = tf.linespace(${
			this.data?.toFixed(2) || "some value"
		})`;
	}
}

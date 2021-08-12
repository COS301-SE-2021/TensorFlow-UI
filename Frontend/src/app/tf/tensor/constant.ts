import {TFTensor} from "./tensor";

export class TFConstant extends TFTensor {
	constructor(public data: Number | undefined = undefined,
				public name: String | undefined = undefined) {
		super(data, name, 1);
	}

	code() {
		return `${this.name} = tf.constant(${
			this.data?.toFixed(2) || "some value"
		})`;
	}
}

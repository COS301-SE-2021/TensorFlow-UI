import {TFTensor} from "./tensor";

export class TFOnes extends TFTensor {
	constructor(public data: Number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.ones(${
			this.data?.toFixed(2) || "some value"
		})`;
	}
}

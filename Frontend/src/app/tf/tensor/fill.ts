import { TFTensor } from "./tensor";

export class TFFill extends TFTensor {
	constructor(public data: Number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.fill(${
			this.data?.toFixed(2) || "some value"
		})`;
	}
}

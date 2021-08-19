import {TFTensor} from "./tensor";

export class TFZeros extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.zeros(${
			this.data || "some value"
		})`;
	}
}

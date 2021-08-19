import {TFTensor} from "./tensor";

export class TFOnes extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.ones(${
			this.data || "some value"
		})`;
	}
}

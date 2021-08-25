// tf.rand (shape, randFunction, dtype?)
import {TFTensor} from "../tensor";

export class TFRand extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.rand(${
			this.data || "some value"
		})`;
	}
}

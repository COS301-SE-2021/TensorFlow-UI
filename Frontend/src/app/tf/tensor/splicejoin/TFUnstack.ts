// tf.unstack (x, axis?)
import {TFTensor} from "../tensor";

export class TFUnstack extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.unstack(${
			this.data || "some value"
		})`;
	}
}

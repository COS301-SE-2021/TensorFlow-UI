// tf.reverse (x, axis?)
import {TFTensor} from "../tensor";

export class TFReverse extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.reverse(${
			this.data || "some value"
		})`;
	}
}

// tf.cast (x, dtype)
import {TFTensor} from "../tensor";

export class TFCast extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.cast(${
			this.data || "some value"
		})`;
	}
}

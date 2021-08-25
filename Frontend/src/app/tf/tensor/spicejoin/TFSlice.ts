// tf.slice (x, begin, size?)
import {TFTensor} from "../tensor";

export class TFSlice extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.slice(${
			this.data || "some value"
		})`;
	}
}

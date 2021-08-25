// tf.concat (tensors, axis?)
import {TFTensor} from "../tensor";

export class TFConcat extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.concat(${
			this.data || "some value"
		})`;
	}
}

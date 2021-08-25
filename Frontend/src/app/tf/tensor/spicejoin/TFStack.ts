// tf.stack (tensors, axis?)
import {TFTensor} from "../tensor";

export class TFStack extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.stack(${
			this.data || "some value"
		})`;
	}
}

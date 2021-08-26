// tf.booleanMaskAsync (tensor, mask, axis?)
import {TFTensor} from "../tensor";

export class TFBooleanMaskAsync extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.booleanMaskAsync(${
			this.data || "some value"
		})`;
	}
}

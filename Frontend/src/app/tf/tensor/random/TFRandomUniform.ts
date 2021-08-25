// tf.randomUniform (shape, minval?, maxval?, dtype?, seed?)
import {TFTensor} from "../tensor";

export class TFRandomUniform extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.randomUniform(${
			this.data || "some value"
		})`;
	}
}

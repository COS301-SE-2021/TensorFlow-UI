// tf.randomGamma (shape, alpha, beta?, dtype?, seed?)
import {TFTensor} from "../tensor";

export class TFRandomGamma extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.randomGamma(${
			this.data || "some value"
		})`;
	}
}

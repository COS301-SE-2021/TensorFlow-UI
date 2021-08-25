// tf.expandDims (x, axis?)
import {TFTensor} from "../tensor";

export class TFExpandDims extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.expandDims(${
			this.data || "some value"
		})`;
	}
}

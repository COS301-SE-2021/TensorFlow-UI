// tf.pad (x, paddings, constantValue?)
import {TFTensor} from "../tensor";


export class TFPad extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.pad(${
			this.data || "some value"
		})`;
	}
}

// tf.reshape (x, shape)
import {TFTensor} from "../tensor";


export class TFReshape extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.reshape(${
			this.data || "some value"
		})`;
	}
}

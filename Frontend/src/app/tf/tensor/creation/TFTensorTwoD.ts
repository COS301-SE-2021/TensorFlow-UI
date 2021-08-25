import {TFTensor} from "../tensor";

export class TFTensorTwoD extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.tensor2d(${
			this.data || "some value"
		})`;
	}
}

import {TFTensor} from "./tensor";

export class TFConstant extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.constant(${
			this.data || "some value"
		})`;
	}
}

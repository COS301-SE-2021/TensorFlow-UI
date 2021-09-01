import {TFTensor} from "../tensor";

export class TFComplex extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.complex(${
			this.data || "some value"
		})`;
	}
}
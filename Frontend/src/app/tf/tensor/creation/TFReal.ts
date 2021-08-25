import {TFTensor} from "../tensor";

export class TFReal extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.real(${
			this.data || "some value"
		})`;
	}
}

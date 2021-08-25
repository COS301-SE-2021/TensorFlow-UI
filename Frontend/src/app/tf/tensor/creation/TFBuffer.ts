import {TFTensor} from "../tensor";

export class TFBuffer extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.buffer(${
			this.data || "some value"
		})`;
	}
}

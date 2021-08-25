import {TFTensor} from "../tensor";

export class TFRange extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.range(${
			this.data || "some value"
		})`;
	}
}

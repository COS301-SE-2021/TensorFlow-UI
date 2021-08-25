import {TFTensor} from "../tensor";

export class TFTruncatedNormal extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.truncatedNormal(${
			this.data || "some value"
		})`;
	}
}

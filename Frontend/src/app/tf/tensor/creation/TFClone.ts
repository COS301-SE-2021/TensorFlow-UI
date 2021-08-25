import {TFTensor} from "../tensor";

export class TFClone extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.clone(${
			this.data || "some value"
		})`;
	}
}

import {TFTensor} from "../tensor";

export class TFOnesLike extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.oneslike(${
			this.data || "some value"
		})`;
	}
}

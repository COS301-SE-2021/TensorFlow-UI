import {TFTensor} from "../tensor";

export class TFOneHot extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.oneHot(${
			this.data || "some value"
		})`;
	}
}

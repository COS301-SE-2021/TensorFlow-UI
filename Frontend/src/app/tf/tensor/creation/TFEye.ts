import {TFTensor} from "../tensor";

export class TFEye extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.eye(${
			this.data || "some value"
		})`;
	}
}

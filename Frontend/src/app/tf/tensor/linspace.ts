import { TFTensor } from "./tensor";

export class TFLinespace extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.linespace(${
			this.data || "some value"
		})`;
	}
}

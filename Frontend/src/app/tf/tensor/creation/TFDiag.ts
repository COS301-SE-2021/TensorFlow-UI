import {TFTensor} from "../tensor";

export class TFDiag extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.diag(${
			this.data || "some value"
		})`;
	}
}

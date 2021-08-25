// tf.mirrorPad (x, paddings, mode)
import {TFTensor} from "../tensor";


export class TFMirrorPad extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.mirrorPad(${
			this.data || "some value"
		})`;
	}
}

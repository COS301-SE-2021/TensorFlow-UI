// tf.gather (x, indices, axis?, batchDims?)
import {TFTensor} from "../tensor";

export class TFGather extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.gather(${
			this.data || "some value"
		})`;
	}
}

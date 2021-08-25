// tf.batchToSpaceND (x, blockShape, crops)
import {TFTensor} from "../tensor";

export class TFBatchToSpaceND extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.batchToSpaceND(${
			this.data || "some value"
		})`;
	}
}

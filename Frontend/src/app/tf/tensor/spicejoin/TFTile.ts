// tf.tile (x, reps)
import {TFTensor} from "../tensor";

export class TFTile extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.tile(${
			this.data || "some value"
		})`;
	}
}

// tf.spaceToBatchND (x, blockShape, paddings)
export class TFSpaceToBatchND extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.spaceToBatchND(${
			this.data || "some value"
		})`;
	}
}

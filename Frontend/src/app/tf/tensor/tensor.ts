import {TFNode} from "../node";

export abstract class TFTensor extends TFNode {

	protected constructor(
		public data: Number | undefined = undefined,
		public name: String | undefined = undefined,
		public count: number
	) {
		super(name);
	}
}

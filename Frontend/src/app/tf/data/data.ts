import {TFNode} from "../node";

export abstract class TFData extends TFNode {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(name, "Data", data);
	}
}

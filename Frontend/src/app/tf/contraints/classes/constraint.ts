import {TFNode} from "../../node";

export abstract class TFConstraint extends TFNode {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(name, "Constraint", data);
	}
}

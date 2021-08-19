import {TFNode} from "../node";

export abstract class TFOperator extends TFNode {
	protected constructor(public name: string | undefined = undefined) {
		super(name, "Operator",undefined);
	}
}

import {TFNode} from "../node";

export abstract class TFOperator extends TFNode {
	protected constructor(public name: String | undefined = undefined) {
		super(name);
	}
}

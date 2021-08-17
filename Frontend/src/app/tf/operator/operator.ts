import {TFNode} from "../node";

export abstract class TFOperator extends TFNode {
	protected constructor(public name: String | undefined = undefined,
                        public childOne: TFNode | undefined = undefined,
                        public childTwo: TFNode | undefined = undefined
                        ) {
		super(name, childOne, childTwo);
	}
}

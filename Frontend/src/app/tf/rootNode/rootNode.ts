import {TFNode} from "../node";

export class TFRootNode extends TFNode {


    constructor(public data: number | undefined = undefined,
                public name: string | undefined = undefined) {
        super("RootNode", "RootNode",undefined);
    }

    code() {

    }
}

import {TFNode} from "../node";
import {LGraphNode} from "litegraph.js";

export class TFRootNode extends TFNode {


    constructor(public data: number | undefined = undefined,
                public name: string | undefined = undefined) {
        super("RootNode", "Tensor",data);
    }

    code() {

    }

    UIStructure(node: LGraphNode) {
        node.addInput("Result", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
    }
}

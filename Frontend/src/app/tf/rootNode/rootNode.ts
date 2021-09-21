import {TFNode} from "../node";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../Components/navbar/navbar.component";

export class TFRootNode extends TFNode {


    constructor(public data: number | undefined = undefined,
                public name: string | undefined = undefined) {
        super("RootNode", "Tensor",data);
    }

    code() {

    }

    UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
        node.addInput("Result", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
    }
}

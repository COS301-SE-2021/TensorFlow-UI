import {TFOperator} from "../operator";
import {Store} from "@ngxs/store";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFFloorDiv extends TFOperator {
    constructor(public name: string | undefined = undefined,private store: Store) {
        super(name);
    }

    code(storageLinks,storageNodes) {

        let res = this.genericArithmeticCode(storageLinks,storageNodes,"FloorDiv");
        if(res=="")
            return;

        return `${this.name + "= tf.math.floordiv("+ res })`;
    }

    UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
        node.addInput("a", "tf.Tensor");
        node.addInput("b", "tf.Tensor");
        this.createNodeNameWidget(node,navbar);
        node.addOutput("a/b", "tf.Tensor");
    }
}

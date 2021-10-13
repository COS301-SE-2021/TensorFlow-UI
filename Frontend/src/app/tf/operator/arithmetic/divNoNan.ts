import {TFOperator} from "../operator";
import {Store} from "@ngxs/store";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFDivideNoNan extends TFOperator {
    constructor(public name: string | undefined = undefined,private store: Store) {
        super(name);
    }

    code(storageLinks,storageNodes) {

        let res = this.genericArithmeticCode(storageLinks,storageNodes,"Divide NoNan");
        return `${this.name + "= tf.math.divide_no_nan("+ res})`;
    }

    UIStructure(node: LGraphNode,navbar?:NavbarComponent) { 

        node.addInput("a", "tf.Tensor");
        node.addInput("b", "tf.Tensor");
        this.createNodeNameWidget(node,navbar);
        node.addOutput("a/b", "tf.Tensor");
    }
}

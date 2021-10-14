import {TFOperator} from "../operator";
import {Store} from "@ngxs/store";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFMinimum extends TFOperator {
    private language:string="tensorflow";
    constructor(public name: string | undefined = undefined,private store: Store) {
        super(name);
    }

    code(storageLinks,storageNodes) {

        if(this.language=="tensorflow") {
            let res = this.genericArithmeticCode(storageLinks, storageNodes, "Maximum");
            return `${this.name + "= tf.math.minimum(" + res})`;
        }
        else{
            return (this.name+" = torch.minimum("+
                this.GetNode(storageLinks, storageNodes, this.inputs[0].link,"input","Minimum")+","+
                this.GetNode(storageLinks, storageNodes, this.inputs[1].link, "other","Minimum")+")")
        }
    }

    UIStructure(node: LGraphNode,navbar?:NavbarComponent, language?: string) {
        language="pyTorch";
        if(!language || language==="tensorflow") {
            node.addInput("a", "tf.Tensor");
            node.addInput("b", "tf.Tensor");
            this.createNodeNameWidget(node,navbar);
            node.addOutput("a < b ? a : b", "tf.Tensor");
        }
        else{
            this.language = language;
            node.addInput("input", "tf.Tensor");
            node.addInput("other", "tf.Tensor");
            this.createNodeNameWidget(node,navbar);
            node.addOutput("input < other ? input : other", "tf.Tensor");
        }
    }
}

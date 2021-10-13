import {TFOperator} from "../operator";
import {Store} from "@ngxs/store";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFPow extends TFOperator {
    private language:string="tensorflow";
    constructor(public name: string | undefined = undefined,private store: Store) {
        super(name);
    }

    code(storageLinks,storageNodes) {
        if(this.language=="tensorflow") {
            let res = this.genericArithmeticCode(storageLinks, storageNodes, "Pow");
            return `${this.name + "= tf.math.pow(" + res})`;
        }
        else{
            return (this.name+" = torch.pow("+
                this.GetNode(storageLinks, storageNodes, this.inputs[0].link,"input","Divide")+","+
                this.GetNode(storageLinks, storageNodes, this.inputs[1].link, "other","Divide")+",*"+
                ",out=None)"
            );
        }
    }

    UIStructure(node: LGraphNode,navbar?:NavbarComponent, language?: string) {
        language="pyTorch";
        if(!language || language==="tensorflow") {
            node.addInput("a", "tf.Tensor");
            node.addInput("b", "tf.Tensor");
            this.createNodeNameWidget(node, navbar);
            node.addOutput("a^b", "tf.Tensor");
        }
        else{
            this.language = language;
            node.addInput("input", "tf.Tensor");
            node.addInput("exponent", "tf.Tensor");
            this.createNodeNameWidget(node, navbar);
            node.addOutput("input^exponent", "tf.Tensor");
        }
    }
}
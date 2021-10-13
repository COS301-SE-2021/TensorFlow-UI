import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFMultiply extends TFOperator {
	private language:string="tensorflow";
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		if(this.language=="tensorflow") {
			let res = this.genericArithmeticCode(storageLinks, storageNodes, "Multiply");
			return `${this.name + "= tf.math.multiply(" + res})`;
		}
		else{
			return (this.name+" = torch.mul("+
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
			node.addOutput("a*b", "tf.Tensor");
		}
		else{
			this.language = language;
			node.addInput("other", "tf.Tensor");
			node.addInput("input", "tf.Tensor");
			this.createNodeNameWidget(node, navbar);
			node.addOutput("other*input", "tf.Tensor");
		}
	}
}

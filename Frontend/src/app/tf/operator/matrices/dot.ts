import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFDot extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes){
		return `${this.name + "tf.outerProduct("+
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link)+","+
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link)+")"
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("t1", "tf.Tensor");
		node.addInput("t2", "tf.Tensor");
		node.addOutput("t1.t2", "tf.Tensor");
	}

}


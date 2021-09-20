import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFSigmoid extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.math.sigmoid("+
		this.GetNode(storageLinks, storageNodes, this.inputs[0].link)})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent)  {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		this.createNodeNameWidget(node,navbar);
		node.addOutput("1 / (1+exp(-x))", "tf.Tensor");
	}
}

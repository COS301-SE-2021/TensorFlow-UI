import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFWhereAsync extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name  + "= tf.whereAsync(" +
		this.GetNode(storageLinks, storageNodes, this.inputs[0].link)})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("Condition", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("whereAsync", "tf.Tensor"); //Returns: Promise<tf.Tensor2D>
	}
}

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFConfusionMatrix extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.confusionMatrix(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[2].link)}
		)`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("labels", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("predictions", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("numClasses", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("confusionMatrix", "tf.Tensor");
	}
}

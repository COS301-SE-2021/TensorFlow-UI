import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFBasicLSTMCell extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name} = tf.math.basicLSTMCell(
		${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
		${this.GetNode(storageLinks, storageNodes, this.inputs[1].link)},
		${this.GetNode(storageLinks, storageNodes, this.inputs[2].link)},
		${this.GetNode(storageLinks, storageNodes, this.inputs[3].link)},
		${this.GetNode(storageLinks, storageNodes, this.inputs[4].link)},
		${this.GetNode(storageLinks, storageNodes, this.inputs[5].link)})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("forgetBias", "tf.Scalar"); //tf.Scalar|TypedArray|Array
		node.addInput("lstmKernel", "tf.Tensor"); //tf.Tensor2D|TypedArray|Array
		node.addInput("lstmBias", "tf.Tensor"); //tf.Tensor1D|TypedArray|Array
		node.addInput("data", "tf.Tensor"); // (tf.Tensor2D|TypedArray|Array)
		node.addInput("c", "tf.Tensor"); // (tf.Tensor2D|TypedArray|Array)
		node.addInput("h", "tf.Tensor"); // (tf.Tensor2D|TypedArray|Array)
		node.addOutput("BasicLSTMCell", "tf.Tensor"); // [tf.Tensor2D, tf.Tensor2D]
	}
}

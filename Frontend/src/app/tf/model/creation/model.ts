import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";
import {TFOperator} from "../../operator";
import {TFNode} from "../../node";

export class TFModel extends TFOperator {
	constructor(
		public name: string | undefined = undefined,
    public layers: TFNode | undefined = undefined) {
		super(name);
	}

	code() {
		// return `${this.name} = tf.model(
		// ${this.childOne?.name || "some value"},
		// ${this.childTwo?.name || "some value"
		// })`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		// node.addInput("A","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		// node.addInput("B","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		// node.addOutput("A+B","tf.Tensor");
	}
}

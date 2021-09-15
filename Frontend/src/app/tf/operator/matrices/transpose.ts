import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFTranspose extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes){
		return `${this.name} = tf.transpose(
		${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
		${this.widgets.find(element => element.type == "perm")?.value || ""}
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","perm?","", (value) => { this.changeWidgetValue(value, "perm")});
		node.addOutput("tf.Tensor", "tf.Tensor");
	}

}

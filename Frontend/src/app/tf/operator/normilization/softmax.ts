import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFSoftmax extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.softmax(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.widgets.find(element => element.type == "dim")?.value || ""
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("logits", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text", "dim?", "", (value) => {
			this.changeWidgetValue(value, "dim");
		});
		node.addOutput("tf.Tensor", "tf.Tensor");
	}

}

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFLogSoftmax extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.logSoftmax(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.widgets.find(element => element.type == "axis")?.value || ""
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text", "axis?", "", (value) => {
			this.changeWidgetValue(value, "axis");
		});
		node.addOutput("tf.Tensor", "tf.Tensor");
	}

}

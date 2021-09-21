import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFDropout extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.dropout(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.widgets.find(element => element.type == "rate")?.value || "0" + "," +
			this.widgets.find(element => element.type == "noiseShape")?.value || "0" + "," +
			this.widgets.find(element => element.type == "seed")?.value || "0"
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text", "rate", "[0,1)", (value) => {
			this.changeWidgetValue(value, "rate");
		});
		node.addWidget("text", "noiseShape?", "[2,2]", (value) => {
			this.changeWidgetValue(value, "noiseShape");
		});
		node.addWidget("text", "seed?", 0, (value) => {
			this.changeWidgetValue(value, "seed");
		});
		node.addOutput("dropout", "tf.Tensor");
	}
}

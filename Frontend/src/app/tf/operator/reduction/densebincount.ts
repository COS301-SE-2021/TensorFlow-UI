import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFDenseBincount extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.denseBincount(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link) + "," +
			this.widgets.find(element => element.type == "size")?.value || "" + "," +
			this.widgets.find(element => element.type == "binaryOutput")?.value || ""
	})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("weights", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text", "size", "", (value) => {
			this.changeWidgetValue(value, "size");
		});
		node.addWidget("toggle", "binaryOutput?", false, (value) => {
			this.pushToArray(this.widgets, {type: "binaryOutput", value: value});
		}, {values: [true, false]})
		node.addOutput("tf.Tensor", "tf.Tensor"); // Returns: tf.Tensor1D|tf.Tensor2D
	}
}

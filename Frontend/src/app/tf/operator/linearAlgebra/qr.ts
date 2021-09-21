import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFqr extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.linalg.qr(" + 
		this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
		this.widgets.find(element => element.type == "fullMatrices")?.value || "N/A"}
		)`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("toggle","fullMatrices?",false, (value) => {
			this.pushToArray(this.widgets, {type: "fullMatrices", value: value});
		},{values: [true,false]})
		node.addOutput("qr", "tf.Tensor");
	}
}

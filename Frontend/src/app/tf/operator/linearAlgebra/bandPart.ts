import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFBandPart extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.linalg.bandPart(" +
		this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
		this.widgets.find(element => element.type == "numLower")?.value || "N/A" + "," +
		this.widgets.find(element => element.type == "numUpper")?.value || "N/A"}
		)`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("a", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","numLower",0, (value) => {
			this.changeWidgetValue(value,"numLower");});
		node.addWidget("text","numUpper",0, (value) => {
			this.changeWidgetValue(value,"numUpper");});
		node.addOutput("bandPart", "tf.Tensor");
	}
}

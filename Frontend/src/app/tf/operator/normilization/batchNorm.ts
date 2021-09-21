import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFBatchNorm extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.batchNorm(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[2].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[3].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[4].link) + "," +
			this.widgets.find(element => element.type == "varianceEpsilon")?.value || ""
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("mean", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("variance", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("offset?", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("scale?", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text", "varianceEpsilon?", "", (value) => {
			this.changeWidgetValue(value, "varianceEpsilon");
		});
		node.addOutput("tf.Tensor", "tf.Tensor");
	}

}

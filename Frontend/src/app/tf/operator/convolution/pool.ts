import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFPool extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes){
		return `${this.name} = tf.pool(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
			${this.widgets.find(element => element.type == "WindowShape")?.value || "0"},
			${this.widgets.find(element => element.type == "poolingType")?.value || "0"},
			${this.widgets.find(element => element.type == "pad")?.value || "0"},
			${this.widgets.find(element => element.type == "dilation")?.value || "0"},
			${this.widgets.find(element => element.type == "strides")?.value || "0"}
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("input","tf.Tensor");
		node.addWidget("text","WindowShape","2",(value) => { this.changeWidgetValue(value,"WindowShape");});
		node.addWidget("text","poolingType","1",(value) => { this.changeWidgetValue(value,"poolingType");});
		node.addWidget("text","pad","valid",(value) => { this.changeWidgetValue(value,"pad");});
		node.addWidget("text","dilation?","",(value) => { this.changeWidgetValue(value,"dilation");});
		node.addWidget("text","strides","1",(value) => { this.changeWidgetValue(value,"strides");});
		node.addOutput("tf.Tensor3D|tf.Tensor4D","tf.Tensor");
	}

}

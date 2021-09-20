import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFAvgPool3D extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes){
		return `${this.name} = tf.avgPool3d(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
			${this.widgets.find(element => element.type == "filterSize")?.value || "0"},
			${this.widgets.find(element => element.type == "strides")?.value || "0"},
			${this.widgets.find(element => element.type == "pad")?.value || "0"}
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("X","tf.Tensor");
		node.addWidget("text","filterSize","2",(value) => { this.changeWidgetValue(value,"filterSize");});
		node.addWidget("text","strides","1",(value) => { this.changeWidgetValue(value,"strides");});
		node.addWidget("text","pad","valid",(value) => { this.changeWidgetValue(value,"pad");});
		node.addOutput("Tensor4D|Tensor5D","tf.Tensor");
	}

}

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFSeparableConv2d extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes){
		return `${this.name} = tf.separableConv2d(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
			${this.widgets.find(element => element.type == "pointwiseFilter")?.value || "0"},
			${this.widgets.find(element => element.type == "depthwiseFilter")?.value || "0"},
			${this.widgets.find(element => element.type == "strides")?.value || "0"},
			${this.widgets.find(element => element.type == "pad")?.value || "0"},
			${this.widgets.find(element => element.type == "dilation")?.value || "0"},
			${this.widgets.find(element => element.type == "dataFormat")?.value || "0"}
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("input","tf.Tensor");
		node.addWidget("text","pointwiseFilter","2",(value) => { this.changeWidgetValue(value,"pointwiseFilter");});
		node.addWidget("text","depthwiseFilter?","1",(value) => { this.changeWidgetValue(value,"depthwiseFilter?");});
		node.addWidget("text","strides","1",(value) => { this.changeWidgetValue(value,"strides");});
		node.addWidget("text","pad","valid",(value) => { this.changeWidgetValue(value,"pad");});
		node.addWidget("text","dilation?","",(value) => { this.changeWidgetValue(value,"dilation");});
		node.addWidget("text","dataFormat?","",(value) => { this.changeWidgetValue(value,"dataFormat");});
		node.addOutput("tf.Tensor3D|tf.Tensor4D","tf.Tensor");
	}

}

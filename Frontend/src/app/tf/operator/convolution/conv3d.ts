import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFConv3d extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes){
		return `${this.name} = tf.conv3d(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
			${this.widgets.find(element => element.type == "filterSize")?.value || "0"},
			${this.widgets.find(element => element.type == "strides")?.value || "0"},
			${this.widgets.find(element => element.type == "pad")?.value || "0"},
			${this.widgets.find(element => element.type == "dataFormat")?.value || "0"},
			${this.widgets.find(element => element.type == "dilation")?.value || "0"},
			${this.widgets.find(element => element.type == "dimRoundingMode")?.value || "0"}
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("X","tf.Tensor");
		node.addWidget("text","filterSize","2",(value) => { this.changeWidgetValue(value,"filterSize");});
		node.addWidget("text","strides","1",(value) => { this.changeWidgetValue(value,"strides");});
		node.addWidget("text","pad","valid",(value) => { this.changeWidgetValue(value,"pad");});
		node.addWidget("text","dataFormat?","",(value) => { this.changeWidgetValue(value,"dataFormat");});
		node.addWidget("text","dilation?","",(value) => { this.changeWidgetValue(value,"dilation");});
		node.addWidget("text","dimRoundingMode?","",(value) => { this.changeWidgetValue(value,"dimRoundingMode");});
		node.addOutput("tf.Tensor4D|tf.Tensor5D","tf.Tensor");
	}

}

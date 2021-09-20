import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMaxPoolWithArdMax extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes){
		return `${this.name} = tf.maxPoolWithArgmax(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
			${this.widgets.find(element => element.type == "filterSize")?.value || "0"},
			${this.widgets.find(element => element.type == "strides")?.value || "0"},
			${this.widgets.find(element => element.type == "pad")?.value || "0"},
			${this.widgets.find(element => element.type == "includeBatchInIndex")?.value || "0"}
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("X","tf.Tensor");
		node.addWidget("text","filterSize","2",(value) => { this.changeWidgetValue(value,"filterSize");});
		node.addWidget("text","strides","1",(value) => { this.changeWidgetValue(value,"strides");});
		node.addWidget("text","pad","valid",(value) => { this.changeWidgetValue(value,"pad");});
		node.addWidget("text","includeBatchInIndex?","",(value) => { this.changeWidgetValue(value,"includeBatchInIndex");});
		node.addOutput("[Name]: tf.Tensor","tf.Tensor");
	}

}

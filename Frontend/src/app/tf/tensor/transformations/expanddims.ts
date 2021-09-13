// tf.expandDims (x, axis?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFExpandDims extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

code(storageLinks,storageNodes) {
		return `${this.name} = ${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)}.tf.expandDims(
			${this.widgets.find(element => element.type == "axis")?.value || ""}
		)`;
	}

	UIStructure(node: LGraphNode){
		node.addInput("X", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","axis?","[0,0]", (value) => {
			this.changeWidgetValue(value,"axis");});
		node.addOutput("tf.Tensor", "tf.Tensor");
	}
}

// tf.batchToSpaceND (x, blockShape, crops)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFBatchToSpaceND extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name} = ${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)}.tf.batchToSpaceND(
			${this.widgets.find(element => element.type == "blockShape")?.value || ""}
			${this.widgets.find(element => element.type == "crops")?.value || ""})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","blockShape","[0,2,4]", (value) => {
			this.changeWidgetValue(value,"blockShape");});
		node.addWidget("text","crops","[[0,0], [0,0]]", (value) => {
			this.changeWidgetValue(value,"crops");});
		node.addOutput("Value","tf.Tensor");
	}

}

// tf.broadcastTo (x, shape)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";


export class TFBroadcastTo extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}



	code(storageLinks,storageNodes) {
		return `${this.name} = tf.batchToSpaceND(
		${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
		${this.widgets.find(element => element.type == "shape")?.value || ""}
		})`;
	}
	UIStructure(node: LGraphNode){
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","shape","[0,0]", (value) => {
			this.changeWidgetValue(value,"shape");});
	}
}

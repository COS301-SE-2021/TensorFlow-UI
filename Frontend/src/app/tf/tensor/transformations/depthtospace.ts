// tf.depthToSpace (x, blockSize, dataFormat?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFDepthToSpace extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name} = tf.depthToSpace(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
			${this.widgets.find(element => element.type == "blockSize")?.value || ""}
			${this.widgets.find(element => element.type == "dataFormat")?.value || "NHWC"},
	})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","blockSize",0, (value) => {
			this.changeWidgetValue(value,"blockSize");});
		node.addWidget("combo","dataFormat?","", (value) => {
			this.changeWidgetValue(value,"dataFormat");
		},{values: ["NHWC","NCHW"]});
		node.addOutput("Value", "tf.Tensor");
	}
}

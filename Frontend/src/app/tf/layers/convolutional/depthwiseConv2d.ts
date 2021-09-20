import {TFLayers} from "../layers";
import {LGraphNode} from "litegraph.js";

export class TFDepthwiseConv2d extends TFLayers {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name} = tf.layers.depthwiseConv2d(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
	})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("args(Object)", "Object"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("tf.layers.Layer","tf.layers.Layer");
	}
}

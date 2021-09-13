import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFConv3dtranspose extends TFOperator{

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes){
		return `${this.name} = tf.conv3dTranspose(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
			${this.widgets.find(element => element.type == "filterSize")?.value || "0"},
			${this.widgets.find(element => element.type == "strides")?.value || "0"},
			${this.widgets.find(element => element.type == "pad")?.value || "0"},
			${this.widgets.find(element => element.type == "dataFormat")?.value || "0"},
			${this.widgets.find(element => element.type == "dilation")?.value || "0"},
			${this.widgets.find(element => element.type == "dimRoundingMode")?.value || "0"}
		})`;
	}

	UIStructure(node: LGraphNode) {
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

// tf.conv3dTranspose (x, filter, outputShape, strides, pad) functionsource
// Computes the transposed 3D convolution of a volume, also known as a deconvolution.
//
// 	Parameters:
// x (tf.Tensor4D|tf.Tensor5D|TypedArray|Array) The input image, of rank 5 or rank 4, of shape [batch, depth, height, width, inDepth]. If rank 4, batch of 1 is assumed.
// filter (tf.Tensor5D|TypedArray|Array) The filter, rank 4, of shape [depth, filterHeight, filterWidth, outDepth, inDepth]. inDepth must match inDepth in x.
// outputShape ([number, number, number, number, number]|[number, number, number, number]) Output shape, of rank 5 or rank 4: [batch, depth, height, width, outDepth]. If rank 3, batch of 1 is assumed.
// strides ([number, number, number]|number) The strides of the original convolution: [strideDepth, strideHeight, strideWidth].
// pad ('valid'|'same') The type of padding algorithm used in the non-transpose version of the op.
// 	Returns: tf.Tensor4D|tf.Tensor5D





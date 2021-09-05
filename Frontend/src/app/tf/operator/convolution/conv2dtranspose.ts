// tf.conv2dTranspose (x, filter, outputShape, strides, pad, dimRoundingMode?) functionsource
// Computes the transposed 2D convolution of an image, also known as a deconvolution.
//
// 	Parameters:
// x (tf.Tensor3D|tf.Tensor4D|TypedArray|Array) The input image, of rank 4 or rank 3, of shape [batch, height, width, inDepth]. If rank 3, batch of 1 is assumed.
// filter (tf.Tensor4D|TypedArray|Array) The filter, rank 4, of shape [filterHeight, filterWidth, outDepth, inDepth]. inDepth must match inDepth in x.
// outputShape ([number, number, number, number]|[number, number, number]) Output shape, of rank 4 or rank 3: [batch, height, width, outDepth]. If rank 3, batch of 1 is assumed.
// strides ([number, number]|number) The strides of the original convolution: [strideHeight, strideWidth].
// pad ('valid'|'same'|number|ExplicitPadding) The type of padding algorithm used in the non-transpose version of the op.
// dimRoundingMode ('floor'|'round'|'ceil') A string from: 'ceil', 'round', 'floor'. If none is provided, it will default to truncate. Optional
// Returns: tf.Tensor3D|tf.Tensor4D

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFConv2dTranspose extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.conv2dTranspose(
			${this.TFChildInputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("X","tf.Tensor");
		node.addWidget("text","filterSize","2","");
		node.addWidget("text","strides","1","");
		node.addWidget("text","pad","valid","");
		node.addWidget("text","dataFormat?","","");
		node.addWidget("text","dilation?","","");
		node.addWidget("text","dimRoundingMode?","","");
		node.addOutput("tf.Tensor3D|tf.Tensor4D","tf.Tensor");
	}

}

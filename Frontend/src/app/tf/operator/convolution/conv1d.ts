// tf.conv1d (x, filter, stride, pad, dataFormat?, dilation?, dimRoundingMode?) functionsource
// Computes a 1D convolution over the input x.
//
// 	Parameters:
// x (tf.Tensor2D|tf.Tensor3D|TypedArray|Array) The input tensor, of rank 3 or rank 2, of shape [batch, width, inChannels]. If rank 2, batch of 1 is assumed.
// filter (tf.Tensor3D|TypedArray|Array) The filter, rank 3, of shape [filterWidth, inDepth, outDepth].
// stride (number) The number of entries by which the filter is moved right at each step.
// pad ('valid'|'same'|number|conv_util.ExplicitPadding) The type of padding algorithm.
// 	same and stride 1: output will be of same size as input, regardless of filter size.
// 	valid: output will be smaller than input if filter is larger than 1x1.
// 	For more info, see this guide: https://www.tensorflow.org/api_docs/python/tf/nn/convolution
// 	dataFormat ('NWC'|'NCW') An optional string from "NWC", "NCW". Defaults to "NWC", the data is stored in the order of [batch, in_width, in_channels].
// 	Only "NWC" is currently supported. Optional
// dilation (number) The dilation rate in which we sample input values in atrous convolution. Defaults to 1. If it is greater than 1, then stride must be 1. Optional
// dimRoundingMode ('floor'|'round'|'ceil') A string from: 'ceil', 'round', 'floor'. If none is provided, it will default to truncate. Optional
// Returns: tf.Tensor2D|tf.Tensor3D

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFConv1d extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.conv1d(
			${this.inputs?.forEach(function (key) {
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
		node.addOutput("tf.Tensor2D|tf.Tensor3D","tf.Tensor");
	}
}

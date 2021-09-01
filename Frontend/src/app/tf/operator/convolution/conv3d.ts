// tf.conv3d (x, filter, strides, pad, dataFormat?, dilations?) function
// Computes a 3D convolution over the input x.
//
// 	Parameters:
// x (tf.Tensor4D|tf.Tensor5D|TypedArray|Array) The input tensor, of rank 5 or rank 4, of shape [batch, depth, height, width, channels]. If rank 4, batch of 1 is assumed.
// filter (tf.Tensor5D|TypedArray|Array) The filter, rank 5, of shape [filterDepth, filterHeight, filterWidth, inChannels, outChannels]. inChannels must match between input and filter.
// strides ([number, number, number]|number) The strides of the convolution: [strideDepth, strideHeight, strideWidth].
// pad ('valid'|'same') The type of padding algorithm.
// 	same and stride 1: output will be of same size as input, regardless of filter size.
// 	valid: output will be smaller than input if filter is larger than 1x1.
// 	For more info, see this guide: https://www.tensorflow.org/api_docs/python/tf/nn/convolution
// 	dataFormat ('NDHWC'|'NCDHW') : An optional string from: "NDHWC", "NCDHW". Defaults to "NDHWC". Specify the data format of the input and output data. With the default format "NDHWC", the data is stored in the order of: [batch, depth, height, width, channels]. Only "NDHWC" is currently supported. Optional
// dilations ([number, number, number]|number) The dilation rates: [dilationDepth, dilationHeight, dilationWidth] in which we sample input values across the height and width dimensions in atrous convolution. Defaults to [1, 1, 1]. If dilations is a single number, then dilationDepth == dilationHeight == dilationWidth. If it is greater than 1, then all values of strides must be 1. Optional
// Returns: tf.Tensor4D|tf.Tensor5D

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFConv3d extends TFOperator {

	constructor() {
		super();
	}

	code(){
		return `${this.name} = tf.conv3d(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {

	}

}

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

// tf.depthwiseConv2d (x, filter, strides, pad, dataFormat?, dilations?, dimRoundingMode?) functionsource
// Depthwise 2D convolution.
//
// 	Given a 4D input array and a filter array of shape [filterHeight, filterWidth, inChannels, channelMultiplier] containing inChannels convolutional filters of depth 1, this op applies a different filter to each input channel (expanding from 1 channel to channelMultiplier channels for each), then concatenates the results together. The output has inChannels * channelMultiplier channels.
//
// 	See https://www.tensorflow.org/api_docs/python/tf/nn/depthwise_conv2d for more details.
//
// 	Parameters:
// 		x (tf.Tensor3D|tf.Tensor4D|TypedArray|Array) The input tensor, of rank 4 or rank 3, of shape [batch, height, width, inChannels]. If rank 3, batch of 1 is assumed.
// filter (tf.Tensor4D|TypedArray|Array) The filter tensor, rank 4, of shape [filterHeight, filterWidth, inChannels, channelMultiplier].
// strides ([number, number]|number) The strides of the convolution: [strideHeight, strideWidth]. If strides is a single number, then strideHeight == strideWidth.
// pad ('valid'|'same'|number|ExplicitPadding) The type of padding algorithm.
// 	same and stride 1: output will be of same size as input, regardless of filter size.
// 	valid: output will be smaller than input if filter is larger than 1x1.
// 	For more info, see this guide: https://www.tensorflow.org/api_docs/python/tf/nn/convolution
// 	dataFormat ('NHWC'|'NCHW') : An optional string from: "NHWC", "NCHW". Defaults to "NHWC". Specify the data format of the input and output data. With the default format "NHWC", the data is stored in the order of: [batch, height, width, channels]. Only "NHWC" is currently supported. Optional
// dilations ([number, number]|number) The dilation rates: [dilationHeight, dilationWidth] in which we sample input values across the height and width dimensions in atrous convolution. Defaults to [1, 1]. If rate is a single number, then dilationHeight == dilationWidth. If it is greater than 1, then all values of strides must be 1. Optional
// dimRoundingMode ('floor'|'round'|'ceil') A string from: 'ceil', 'round', 'floor'. If none is provided, it will default to truncate. Optional
// Returns: tf.Tensor3D|tf.Tensor4D

export class TFDepthWiseConv2d extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.depthwiseConv2d(
			${this.inputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("X","tf.Tensor");
		node.addWidget("text","filter","2","");
		node.addWidget("text","strides","1","");
		node.addWidget("text","pad","valid","");
		node.addWidget("text","dataFormat?","","");
		node.addWidget("text","dilation?","","");
		node.addWidget("text","dimRoundingMode?","","");
		node.addOutput("tf.Tensor3D|tf.Tensor4D","tf.Tensor");
	}

}



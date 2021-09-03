import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";


// tf.separableConv2d (x, depthwiseFilter, pointwiseFilter, strides, pad, dilation?, dataFormat?) functionsource
// 2-D convolution with separable filters.
//
// 	Performs a depthwise convolution that acts separately on channels followed by a pointwise convolution that mixes channels. Note that this is separability between dimensions [1, 2] and 3, not spatial separability between dimensions 1 and 2.
//
// See https://www.tensorflow.org/api_docs/python/tf/nn/separable_conv2d for more details.
//
// 	Parameters:
// 		x (tf.Tensor3D|tf.Tensor4D|TypedArray|Array) The input tensor, of rank 4 or rank 3, of shape [batch, height, width, inChannels]. If rank 3, batch of 1 is assumed.
// depthwiseFilter (tf.Tensor4D|TypedArray|Array) The depthwise filter tensor, rank 4, of shape [filterHeight, filterWidth, inChannels, channelMultiplier]. This is the filter used in the first step.
// pointwiseFilter (tf.Tensor4D|TypedArray|Array) The pointwise filter tensor, rank 4, of shape [1, 1, inChannels * channelMultiplier, outChannels]. This is the filter used in the second step.
// strides ([number, number]|number) The strides of the convolution: [strideHeight, strideWidth]. If strides is a single number, then strideHeight == strideWidth.
// pad ('valid'|'same') The type of padding algorithm.
// 	same and stride 1: output will be of same size as input, regardless of filter size.
// 	valid: output will be smaller than input if filter is larger than 1x1.
// 	For more info, see this guide: https://www.tensorflow.org/api_docs/python/tf/nn/convolution
// 	dilation ([number, number]|number) Optional
// dataFormat ('NHWC'|'NCHW') : An optional string from: "NHWC", "NCHW". Defaults to "NHWC". Specify the data format of the input and output data. With the default format "NHWC", the data is stored in the order of: [batch, height, width, channels]. Only "NHWC" is currently supported. Optional
// Returns: tf.Tensor3D|tf.Tensor4D


export class TFSeparableConv2d extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.separableConv2d(
			${this.inputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("X","tf.Tensor");
		node.addWidget("text","pointwiseFilter","2","");
		node.addWidget("text","depthwiseFilter?","","");
		node.addWidget("text","strides","1","");
		node.addWidget("text","pad","valid","");
		node.addWidget("text","dilation?","","");
		node.addWidget("text","dataFormat?","","");
		node.addOutput("tf.Tensor3D|tf.Tensor4D","tf.Tensor");
	}

}

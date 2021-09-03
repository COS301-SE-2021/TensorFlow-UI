import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

// tf.dilation2d (x, filter, strides, pad, dilations?, dataFormat?) functionsource
// Computes the grayscale dilation over the input x.
//
// 	Parameters:
// x (tf.Tensor3D|tf.Tensor4D|TypedArray|Array) The input tensor, rank 3 or rank 4 of shape [batch, height, width, inChannels]. If rank 3, batch of 1 is assumed.
// filter (tf.Tensor3D|TypedArray|Array) The filter tensor, rank 3, of shape [filterHeight, filterWidth, depth].
// strides ([number, number]|number) The strides of the sliding window for each dimension of the input tensor: [strideHeight, strideWidth]. If strides is a single number, then strideHeight == strideWidth.
// pad ('valid'|'same') The type of padding algorithm.
// 	same and stride 1: output will be of same size as input, regardless of filter size.
// 	valid: output will be smaller than input if filter is larger than 1*1x1.
// 	For more info, see this guide: https://www.tensorflow.org/api_docs/python/tf/nn/convolution
// 	dilations ([number, number]|number) The dilation rates: [dilationHeight, dilationWidth] in which we sample input values across the height and width dimensions for atrous morphological dilation. Defaults to [1, 1]. If dilations is a single number, then dilationHeight == dilationWidth. If it is greater than 1, then all values of strides must be 1. Optional
// dataFormat ('NHWC') Specify the data format of the input and output data. Defaults to 'NHWC'. Only 'NHWC' is currently supported. With the default format "NHWC", the data is stored in the order of: [batch, height, width, channels]. Optional
// Returns: tf.Tensor3D|tf.Tensor4D


export class TFDilation extends TFOperator {

	constructor() {
		super();
	}

	code(){
		return `${this.name} = tf.dilation2d(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("X","tf.Tensor");
		node.addWidget("text","filter","2","");
		node.addWidget("text","strides","1","");
		node.addWidget("text","pad","valid","");
		node.addWidget("text","dilation?","","");
		node.addWidget("text","dataFormat?","","");
		node.addOutput("tf.Tensor3D|tf.Tensor4D","tf.Tensor");
	}

}





import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

// tf.pool (input, windowShape, poolingType, pad, dilations?, strides?) functionsource
// Performs an N-D pooling operation
//
// Parameters:
// 	input (tf.Tensor3D|tf.Tensor4D|TypedArray|Array) The input tensor, of rank 4 or rank 3 of shape [batch, height, width, inChannels]. If rank 3, batch of 1 is assumed.
// windowShape ([number, number]|number) The filter size: [filterHeight, filterWidth]. If filterSize is a single number, then filterHeight == filterWidth.
// poolingType ('avg'|'max') The type of pooling, either 'max' or 'avg'.
// pad ('valid'|'same'|number|conv_util.ExplicitPadding) The type of padding algorithm:
// 	same and stride 1: output will be of same size as input, regardless of filter size.
// 	valid: output will be smaller than input if filter is larger than 1x1.
// 	For more info, see this guide: https://www.tensorflow.org/api_guides/python/nn#Convolution
// 	dilations ([number, number]|number) The dilation rates: [dilationHeight, dilationWidth] in which we sample input values across the height and width dimensions in dilated pooling. Defaults to [1, 1]. If dilationRate is a single number, then dilationHeight == dilationWidth. If it is greater than 1, then all values of strides must be 1. Optional
// strides ([number, number]|number) The strides of the pooling: [strideHeight, strideWidth]. If strides is a single number, then strideHeight == strideWidth. Optional
// Returns: tf.Tensor3D|tf.Tensor4D


export class TFPool extends TFOperator {

	constructor() {
		super();
	}

	code(){
		return `${this.name} = tf.pool(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {

	}

}

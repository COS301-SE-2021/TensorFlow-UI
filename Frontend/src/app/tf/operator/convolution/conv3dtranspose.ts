import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFConv3dtranspose extends TFOperator{

	constructor() {
		super();
	}

	code(){
		return `${this.name} = tf.conv3dTranspose(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {

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





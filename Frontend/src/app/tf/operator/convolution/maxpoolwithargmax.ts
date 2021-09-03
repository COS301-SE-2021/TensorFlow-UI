import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";



// tf.maxPoolWithArgmax (x, filterSize, strides, pad, includeBatchInIndex?) functionsource
// Computes the 2D max pooling of an image with Argmax index. The indices in argmax are flattened, so that a maximum value at position [b, y, x, c] becomes flattened index: (y * width + x) * channels + c if include_batch_in_index is False; ((b * height + y) * width + x) * channels +c if include_batch_in_index is True.
//
// 	The indices returned are always in [0, height) x [0, width) before flattening.
//
// 	Parameters:
// x (tf.Tensor4D|TypedArray|Array) The input tensor, of rank 4 or rank 3 of shape [batch, height, width, inChannels]. If rank 3, batch of 1 is assumed.
// filterSize ([number, number]|number) The filter size: [filterHeight, filterWidth]. If filterSize is a single number, then filterHeight == filterWidth.
// strides ([number, number]|number) The strides of the pooling: [strideHeight, strideWidth]. If strides is a single number, then strideHeight == strideWidth.
// pad ('valid'|'same'|number) The type of padding algorithm.
// 	same and stride 1: output will be of same size as input, regardless of filter size.
// 	valid: output will be smaller than input if filter is larger than 1x1.
// 	For more info, see this guide: https://www.tensorflow.org/api_docs/python/tf/nn/convolution
// 	includeBatchInIndex (boolean) Optional
// Returns: {[name: string]: tf.Tensor}}

export class TFMaxPoolWithArdMax extends TFOperator {

	constructor() {
		super();
	}

	code(){
		return `${this.name} = tf.maxPoolWithArgmax(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("X","tf.Tensor");
		node.addWidget("text","filter","2","");
		node.addWidget("text","strides","1","");
		node.addWidget("text","pad","valid","");
		node.addWidget("text","includeBatchInIndex?","","");
		node.addOutput("Name","tf.Tensor");
	}

}

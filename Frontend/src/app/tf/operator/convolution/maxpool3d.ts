import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";



	// tf.maxPool3d (x, filterSize, strides, pad, dimRoundingMode?, dataFormat?) functionsource
	// Computes the 3D max pooling.
	//
	// const x = tf.tensor5d([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 2, 2, 1]);
	// const result = tf.maxPool3d(x, 2, 1, 'valid');
	// result.print();
	// EditRun
	// Parameters:
	// 	x (tf.Tensor4D|tf.Tensor5D|TypedArray|Array) The input tensor, of rank 5 or rank 4 of shape [batch, depth, height, width, inChannels].
	// filterSize ([number, number, number]|number) The filter size: [filterDepth, filterHeight, filterWidth]. If filterSize is a single number, then filterDepth == filterHeight == filterWidth.
	// strides ([number, number, number]|number) The strides of the pooling: [strideDepth, strideHeight, strideWidth]. If strides is a single number, then strideDepth == strideHeight == strideWidth.
	// pad ('valid'|'same'|number) The type of padding algorithm.
	// same and stride 1: output will be of same size as input, regardless of filter size.
	// valid: output will be smaller than input if filter is larger than 1*1x1.
	// For more info, see this guide: https://www.tensorflow.org/api_docs/python/tf/nn/convolution
	// dimRoundingMode ('floor'|'round'|'ceil') A string from: 'ceil', 'round', 'floor'. If none is provided, it will default to truncate. Optional
	// dataFormat ('NDHWC'|'NCDHW') An optional string from: "NDHWC", "NCDHW". Defaults to "NDHWC". Specify the data format of the input and output data. With the default format "NDHWC", the data is stored in the order of: [batch, depth, height, width, channels]. Only "NDHWC" is currently supported. Optional
	// Returns: tf.Tensor4D|tf.Tensor5D


export class TFMaxPool3d extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.maxPool3d(
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
		node.addOutput("tf.Tensor4D|tf.Tensor5D","tf.Tensor");
	}

}

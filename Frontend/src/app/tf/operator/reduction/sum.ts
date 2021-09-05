import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

//tf.sum (x, axis?, keepDims?)
// Computes the sum of elements across dimensions of a tf.Tensor.
//
// Reduces the input along the dimensions given in axes. Unless keepDims is true, the rank of the tf.Tensor is reduced by 1 for each entry in axes. If keepDims is true, the reduced dimensions are retained with length 1. If axes has no entries, all dimensions are reduced, and a tf.Tensor with a single element is returned.
//
// const x = tf.tensor1d([1, 2, 3]);
//
// x.sum().print();  // or tf.sum(x)
// EditRun
// const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
//
// const axis = 1;
// x.sum(axis).print();  // or tf.sum(x, axis)
// EditRun
// Parameters:
// x (tf.Tensor|TypedArray|Array) The input tensor to compute the sum over. If the dtype is bool it will be converted to int32 and the output dtype will be int32.
// axis (number|number[]) The dimension(s) to reduce. By default it reduces all dimensions. Optional
// keepDims (boolean) If true, retains reduced dimensions with size 1. Optional
// Returns: tf.Tensor
export class TFSum extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.sum(
			${this.TFChildInputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {

	}
}
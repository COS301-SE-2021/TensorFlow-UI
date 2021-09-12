import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMax extends TFOperator {
//tf.max (x, axis?, keepDims?) functionsource
// Computes the maximum of elements across dimensions of a tf.Tensor.
//
// Reduces the input along the dimensions given in axes. Unless keepDims is true, the rank of the tf.Tensor is reduced by 1 for each entry in axes. If keepDims is true, the reduced dimensions are retained with length 1. If axes has no entries, all dimensions are reduced, and an tf.Tensor with a single element is returned.
//
// const x = tf.tensor1d([1, 2, 3]);
//
// x.max().print();  // or tf.max(x)
// EditRun
// const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
//
// const axis = 1;
// x.max(axis).print();  // or tf.max(x, axis)
// EditRun
// Parameters:
// x (tf.Tensor|TypedArray|Array) The input tensor.
// axis (number|number[]) The dimension(s) to reduce. By default it reduces all dimensions. Optional
// keepDims (boolean) If true, retains reduced dimensions with size 1. Optional
// Returns: tf.Tensor
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.max(
			${this.TFChildInputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {

	}
}
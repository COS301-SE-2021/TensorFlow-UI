import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMin extends TFOperator {
//tf.min (x, axis?, keepDims?) functionsource
// Computes the minimum value from the input.
//
// Reduces the input along the dimensions given in axes. Unless keepDims is true, the rank of the array is reduced by 1 for each entry in axes. If keepDims is true, the reduced dimensions are retained with length 1. If axes has no entries, all dimensions are reduced, and an array with a single element is returned.
//
// const x = tf.tensor1d([1, 2, 3]);
//
// x.min().print();  // or tf.min(x)
// EditRun
// const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
//
// const axis = 1;
// x.min(axis).print();  // or tf.min(x, axis)
// EditRun
// Parameters:
// x (tf.Tensor|TypedArray|Array) The input Tensor.
// axis (number|number[]) The dimension(s) to reduce. By default it reduces all dimensions. Optional
// keepDims (boolean) If true, retains reduced dimensions with size 1. Optional
// Returns: tf.Tensor
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.min(
			${this.TFChildInputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {

	}
}

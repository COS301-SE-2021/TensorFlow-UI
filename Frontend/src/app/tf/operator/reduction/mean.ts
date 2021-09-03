import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMean extends TFOperator {
//tf.mean (x, axis?, keepDims?) functionsource
// Computes the mean of elements across dimensions of a tf.Tensor.
//
// Reduces x along the dimensions given in axis. Unless keepDims is true, the rank of the tf.Tensor is reduced by 1 for each entry in axis. If keepDims is true, the reduced dimensions are retained with length 1. If axis has no entries, all dimensions are reduced, and a tf.Tensor with a single element is returned.
//
// const x = tf.tensor1d([1, 2, 3]);
//
// x.mean().print();  // or tf.mean(a)
// EditRun
// const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
//
// const axis = 1;
// x.mean(axis).print();  // or tf.mean(x, axis)
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
		return `${this.name} = tf.mean(
			${this.inputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {

	}
}

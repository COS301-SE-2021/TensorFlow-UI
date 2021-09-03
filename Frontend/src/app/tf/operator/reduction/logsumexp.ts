import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

//tf.logSumExp (x, axis?, keepDims?) functionsource
// Computes the log(sum(exp(elements across the reduction dimensions)).
//
// Reduces the input along the dimensions given in axis. Unless keepDims is true, the rank of the array is reduced by 1 for each entry in axis. If keepDims is true, the reduced dimensions are retained with length 1. If axis has no entries, all dimensions are reduced, and an array with a single element is returned.
//
// const x = tf.tensor1d([1, 2, 3]);
//
// x.logSumExp().print();  // or tf.logSumExp(x)
// EditRun
// const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
//
// const axis = 1;
// x.logSumExp(axis).print();  // or tf.logSumExp(a, axis)
// EditRun
// Parameters:
// x (tf.Tensor|TypedArray|Array) The input tensor.
// axis (number|number[]) The dimension(s) to reduce. If null (the default), reduces all dimensions. Optional
// keepDims (boolean) If true, retains reduced dimensions with length of 1. Defaults to false. Optional
// Returns: tf.Tensor
export class TFLogSumExp extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.logSumExp(
			${this.inputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {

	}
}

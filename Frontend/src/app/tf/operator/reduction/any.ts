import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

	// tf.any (x, axis?, keepDims?) functionsource
	// Computes the logical or of elements across dimensions of a tf.Tensor.
	//
	// Reduces the input along the dimensions given in axes. Unless keepDims is true, the rank of the tf.Tensor is reduced by 1 for each entry in axes. If keepDims is true, the reduced dimensions are retained with length 1. If axes has no entries, all dimensions are reduced, and an tf.Tensor with a single element is returned.
	//
	// const x = tf.tensor1d([1, 1, 1], 'bool');
	//
	// x.any().print();  // or tf.any(x)
	// EditRun
	// const x = tf.tensor2d([1, 1, 0, 0], [2, 2], 'bool');
	//
	// const axis = 1;
	// x.any(axis).print();  // or tf.any(x, axis)
	// EditRun
	// Parameters:
	// 	x (tf.Tensor|TypedArray|Array) The input tensor. Must be of dtype bool.
	// axis (number|number[]) The dimension(s) to reduce. By default it reduces all dimensions. Optional
	// keepDims (boolean) If true, retains reduced dimensions with size 1. Optional
	// Returns: tf.Tensor
export class Any extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.any(
			${this.TFChildInputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {

	}
}

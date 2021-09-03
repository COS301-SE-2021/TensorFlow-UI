import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFArgMax extends TFOperator {
//tf.argMax (x, axis?) functionsource
// Returns the indices of the maximum values along an axis.
//
// The result has the same shape as input with the dimension along axis removed.
//
// const x = tf.tensor1d([1, 2, 3]);
//
// x.argMax().print();  // or tf.argMax(x)
// EditRun
// const x = tf.tensor2d([1, 2, 4, 3], [2, 2]);
//
// const axis = 1;
// x.argMax(axis).print();  // or tf.argMax(x, axis)
// EditRun
// Parameters:
// x (tf.Tensor|TypedArray|Array) The input tensor.
// axis (number) The dimension to reduce. Defaults to 0 (outer-most dimension). Optional
// Returns: tf.Tensor

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.argMax(
			${this.inputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {

	}
}

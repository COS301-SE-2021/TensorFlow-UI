import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

//tf.argMin (x, axis?) functionsource
// Returns the indices of the minimum values along an axis.
//
// The result has the same shape as input with the dimension along axis removed.
//
// const x = tf.tensor1d([1, 2, 3]);
//
// x.argMin().print();  // or tf.argMin(x)
// EditRun
// const x = tf.tensor2d([1, 2, 4, 3], [2, 2]);
//
// const axis = 1;
// x.argMin(axis).print();  // or tf.argMin(x, axis)
// EditRun
// Parameters:
// x (tf.Tensor|TypedArray|Array) The input tensor.
// axis (number) The dimension to reduce. Defaults to 0 (outer-most dimension). Optional
// Returns: tf.Tensor
export class TFArgMin extends TFOperator {
	constructor() {
		super();
	}

	code(){
		return `${this.name} = tf.argMin(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {

	}
}

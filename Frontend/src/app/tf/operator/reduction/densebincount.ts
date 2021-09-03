import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFDenseBincount extends TFOperator {
//tf.denseBincount (x, weights, size, binaryOutput?) functionsource
// Outputs a vector with length size and the same dtype as weights.
//
// If weights are empty, then index i stores the number of times the value i is counted in x. If weights are non-empty, then index i stores the sum of the value in weights at each index where the corresponding value in x is i.
//
// Values in x outside of the range [0, size) are ignored.
//
// Parameters:
// x (tf.Tensor1D|tf.Tensor2D|TypedArray|Array) The input int tensor, rank 1 or rank 2.
// weights (tf.Tensor1D|tf.Tensor2D|TypedArray|Array) The weights tensor, must have the same shape as x, or a length-0 Tensor, in which case it acts as all weights equal to 1.
// size (number) Non-negative integer.
// binaryOutput (boolean) Optional. Whether the kernel should count the appearance or number of occurrences. Defaults to False. Optional
// Returns: tf.Tensor1D|tf.Tensor2D
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.denseBincount(
			${this.inputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {

	}
}

// tf.outerProduct (v1, v2)

// const a = tf.tensor1d([1, 2, 3]);
// const b = tf.tensor1d([3, 4, 5]);
//
// tf.outerProduct(a, b).print();

// Parameters:
// 	v1 (tf.Tensor1D|TypedArray|Array) The first vector in the outer product operation.
// v2 (tf.Tensor1D|TypedArray|Array) The second vector in the outer product operation.
// 	Returns: tf.Tensor2D
import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFOuterProduct extends TFOperator {

	constructor() {
		super();
	}

	code(){
		return `${this.name} = tf.outerProduct(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {

	}

}

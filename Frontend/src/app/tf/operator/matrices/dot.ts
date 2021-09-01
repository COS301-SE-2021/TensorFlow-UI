// tf.dot (t1, t2)
// const a = tf.tensor1d([1, 2]);
// const b = tf.tensor2d([[1, 2], [3, 4]]);
// const c = tf.tensor2d([[1, 2, 3], [4, 5, 6]]);
//
// a.dot(b).print();  // or tf.dot(a, b)
// b.dot(a).print();
// b.dot(c).print();

// Parameters:
// 	t1 (tf.Tensor|TypedArray|Array) The first tensor in the dot operation.
// t2 (tf.Tensor|TypedArray|Array) The second tensor in the dot operation.
// 	Returns: tf.Tensor

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFDot extends TFOperator {

	constructor() {
		super();
	}

	code(){
		return `${this.name} = tf.dot(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {

	}

}


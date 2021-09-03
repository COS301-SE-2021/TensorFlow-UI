// tf.matMul (a, b, transposeA?, transposeB?)
// const a = tf.tensor2d([1, 2], [1, 2]);
// const b = tf.tensor2d([1, 2, 3, 4], [2, 2]);
//
// a.matMul(b).print();  // or tf.matMul(a, b)
//
// Parameters:
// 	a (tf.Tensor|TypedArray|Array) First matrix in dot product operation.
// b (tf.Tensor|TypedArray|Array) Second matrix in dot product operation.
// transposeA (boolean) If true, a is transposed before multiplication. Optional
// transposeB (boolean) If true, b is transposed before multiplication. Optional
// Returns: tf.Tensor

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMatMul extends TFOperator {

	constructor() {
		super();
	}

	code(){
		return `${this.name} = tf.matMul(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("B", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("toggle","transposeA",false,"onDeselected",{values: [true,false]})
		node.addWidget("toggle","transposeB",false,"onDeselected",{values: [true,false]})
		node.addOutput("A+B", "tf.Tensor");
	}

}

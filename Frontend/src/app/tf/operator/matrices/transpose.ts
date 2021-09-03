// tf.transpose (x, perm?)

// const a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
//
// a.transpose().print();  // or tf.transpose(a)

// Parameters:
// 	x (tf.Tensor|TypedArray|Array) The tensor to transpose.
// perm (number[]) The permutation of the dimensions of a. Optional
// Returns: tf.Tensor
import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFTranspose extends TFOperator {

	constructor() {
		super();
	}

	code(){
		return `${this.name} = tf.transpose(
		${this.childOne?.name || "some value"},
		${this.childTwo?.name || "some value"
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","perm(optional)","","");
		node.addOutput("", "tf.Tensor");
	}

}

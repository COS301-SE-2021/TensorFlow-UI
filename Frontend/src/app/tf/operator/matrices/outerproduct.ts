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

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.outerProduct(
			${this.TFChildInputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("B", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("A.B", "tf.Tensor");
	}

}

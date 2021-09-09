// tf.norm (x, ord?, axis?, keepDims?)
// const x = tf.tensor1d([1, 2, 3, 4]);
//
// x.norm().print();  // or tf.norm(x)
//
// Parameters:
// 	x (tf.Tensor|TypedArray|Array) The input array.
// ord (number|'euclidean'|'fro') Optional. Order of the norm. Supported norm types are following:
// 	ord	norm for matrices	norm for vectors
// 	'euclidean'	Frobenius norm	2-norm
// 'fro'	Frobenius norm
// Infinity	max(sum(abs(x), axis=1))	max(abs(x))
// -Infinity	min(sum(abs(x), axis=1))	min(abs(x))
// 1	max(sum(abs(x), axis=0))	sum(abs(x))
// 2		sum(abs(x)^2)^1/2*

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFNorm extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(){
		return `${this.name} = tf.norm(
			${this.TFChildInputs?.forEach(function (key) {
			key?.name + "," || `some value,`
		})
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","ord?","","");
		node.addWidget("text","axis?","","");
		node.addWidget("text","keepDims?","","");
		node.addOutput("", "tf.Tensor");
	}

}

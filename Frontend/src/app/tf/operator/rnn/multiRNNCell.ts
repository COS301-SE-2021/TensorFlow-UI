// tf.multiRNNCell (lstmCells, data, c, h) function source
// Computes the next states and outputs of a stack of LSTMCells.
//
// Each cell output is used as input to the next cell.
//
// Returns [cellState, cellOutput].
//
// Derived from tf.contrib.rn.MultiRNNCell.
//
// Parameters:
// lstmCells ((data: tf.Tensor2D, c: tf.Tensor2D, h: tf.Tensor2D): [tf.Tensor2D, tf.Tensor2D][]) Array of LSTMCell functions.
// data (tf.Tensor2D|TypedArray|Array) The input to the cell.
// c (Array) Array of previous cell states.
// h (Array) Array of previous cell outputs.
// Returns: [tf.Tensor2D[], tf.Tensor2D[]]


import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMultiRNNCell extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name} = tf.math.multiRNNCell(
		${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
		${this.GetNode(storageLinks, storageNodes, this.inputs[1].link)},
		${this.GetNode(storageLinks, storageNodes, this.inputs[2].link)},
		${this.GetNode(storageLinks, storageNodes, this.inputs[3].link)})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("lstmCells", "tf.Tensor"); //tf.Tensor2D|TypedArray|Array
		node.addInput("data", "tf.Tensor"); // (tf.Tensor2D|TypedArray|Array)
		node.addInput("c", "tf.Tensor"); // (tf.Tensor2D|TypedArray|Array)
		node.addInput("h", "tf.Tensor"); // (tf.Tensor2D|TypedArray|Array)
		node.addOutput("[tf.Tensor2D[], tf.Tensor2D[]]", "tf.Tensor"); // [tf.Tensor2D, tf.Tensor2D]
	}
}

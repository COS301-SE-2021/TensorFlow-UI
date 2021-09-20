// tf.sequential (config?)
// const model = tf.sequential();


import {LGraphNode} from "litegraph.js";
import {TFOperator} from "../../operator";
import {TFNode} from "../../node";

export class TFSequential extends TFOperator {
	constructor(
		public name: string | undefined = undefined,
    public layers: TFNode | undefined = undefined,
    public lossFunction: string = "mse") {
		super(name);
	}

    code() {
        // return `${this.name} = tf.math.add(
        // ${this.childOne?.name || "some value"},
        // ${this.childTwo?.name || "some value"
        // })`;

        return `
        ${this.name} = tf.keras.Sequential(${this.layers?.name})\n
        ${this.name}.summary()\n
        ${this.name}.compile()\n
        ${this.name}.fit()`
    }

    setLayer(layers) {
        this.layers = layers;
    }

	UIStructure(node: LGraphNode) {
		// node.addInput("A","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		// node.addInput("B","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		// node.addOutput("A+B","tf.Tensor");
	}
}

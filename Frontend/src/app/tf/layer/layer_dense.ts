import {TFNode} from "../node";
import {LGraphNode} from "litegraph.js";

export class TFKerasLayerDense extends TFNode {
  constructor(
    public name: string | undefined = undefined,
    public inputShape : number | number[] | undefined = undefined,
    public units : number | undefined = undefined) {
    super(name);
  }

  code() {
    return `${this.name} = tf.keras.layers.Dense(` +
      `input_shape=[${this.inputShape}], units=${this.units}`
      + `)`;
  }

  UIStructure(node: LGraphNode) {
    node.addInput("A", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
    node.addInput("B", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
    node.addOutput("A+B", "tf.Tensor");

  }
}

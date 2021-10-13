import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";
import {TFOperator} from "../../operator";
import {TFNode} from "../../node";

export class TFSequential extends TFOperator {
	constructor(
		public name: string | undefined = undefined,
        public layers: TFNode | undefined = undefined,
        public labels: TFNode | undefined = undefined,
        public features: TFNode | undefined = undefined,
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
        ${this.name}.fit(${this.labels?.name}, ${this.features?.name})`
    }

    setLayer(layers) {
        this.layers = layers;
    }

    setDataset(labels, features) {
        this.labels = labels;
        this.features = features;
    }

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("labels","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("features","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
        node.addInput("layers", "tf.layers.Layer");
		node.addOutput("output","tf.Tensor");
	}
}

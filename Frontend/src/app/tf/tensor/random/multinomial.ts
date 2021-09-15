// tf.multinomial (logits, numSamples, seed?, normalized?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFMultinomial extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name} = tf.multinomial(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
			${this.widgets.find(element => element.type == "numSamples")?.value || ""},
			${this.widgets.find(element => element.type == "seed")?.value || ""}
			${this.widgets.find(element => element.type == "trainable")?.value || "false" }
	})`;}

	UIStructure(node: LGraphNode) {
		node.addInput("logits", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text","numSamples","2", (value) => {
			this.changeWidgetValue(value,"numSamples");});
		node.addWidget("text","seed?",0, (value) => {
			this.changeWidgetValue(value,"seed");});
		node.addWidget("toggle","normalized?",false,(value) => {
			this.pushToArray(this.widgets, {type: "normalized", value: value});
		},{values: [true,false]})
		node.addOutput("Value","tf.Tensor");
	}
}

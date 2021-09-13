import { TFTensor } from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFLinespace extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.linespace(
			${this.widgets.find(element => element.type == "start")?.value || "0"},
			${this.widgets.find(element => element.type == "stop")?.value || ""}
			${this.widgets.find(element => element.type == "num")?.value || ""}
	})`;}


	UIStructure(node: LGraphNode) {
		node.addWidget("number","start",0,(value) => {
			this.changeWidgetValue(value,"start");});
		node.addWidget("number","stop",0,(value) => {
			this.changeWidgetValue(value,"stop");});
		node.addWidget("number","num",1,(value) => {
			this.changeWidgetValue(value,"num");});
		node.addOutput("linspace sequence","tf.Tensor");
	}
}

import {LGraphNode} from "litegraph.js";
import {TFInitializer} from "./initializer";

export class TFConstant extends TFInitializer {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.constant(
			${this.widgets.find(element => element.type == "value")?.value || "0"},
			${this.widgets.find(element => element.type == "dtype")?.value || "dtype=None"},  
			${this.widgets.find(element => element.type == "shape")?.value || "shape=None"},
			${this.widgets.find(element => element.type == "name")?.value || "name='Const'"}
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addWidget("text", "value", 0, (value) => {
			this.changeWidgetValue(value, "value");
		});
		node.addWidget("combo", "dtype(optional)", "float", (value) => {
			this.changeWidgetValue(value, "dtype");
		}, {values: ["float32", "int32", "bool", "complex64", "string"]});
		node.addWidget("text", "shape(optional)", "shape", (value) => {
			this.changeWidgetValue(value, "shape")
		});
		node.addWidget("text", "name(optional)", "name", (value) => {
			this.changeWidgetValue(value, "name")
		});
		}
}

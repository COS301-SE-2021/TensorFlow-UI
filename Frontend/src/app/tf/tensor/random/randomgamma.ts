// tf.randomGamma (shape, alpha, beta?, dtype?, seed?)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFRandomGamma extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.randomGamma(
			${this.widgets.find(element => element.type == "shape")?.value || "shape=inferred"},
			${this.widgets.find(element => element.type == "alpha")?.value || ""},
			${this.widgets.find(element => element.type == "beta")?.value || "1"},
			${this.widgets.find(element => element.type == "dtype")?.value || "float32"},
			${this.widgets.find(element => element.type == "alpha")?.value || ""}
	})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent){
		node.addWidget("text","shape","[0,2,4]", (value) => {
			this.changeWidgetValue(value,"shape");});
		node.addWidget("text","alpha","2", (value) => {
			this.changeWidgetValue(value,"alpha");});
		node.addWidget("text","beta","2", (value) => {
			this.changeWidgetValue(value,"beta");});
		node.addWidget("combo","dtype?","float",(value) => {
			this.changeWidgetValue(value,"dtype");
		},{values: ["float32","int32","bool","complex64","string"]});
		node.addWidget("text","seed?","2", (value) => {
			this.changeWidgetValue(value,"seed");});
	}
}

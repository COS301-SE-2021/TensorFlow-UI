import {TFLayers} from "../layers";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFFlatten extends TFLayers {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(name);
	}

	code(storageLinks,storageNodes) {
		let res = this.widgets.find(element => element.type == "data_format?")?.value || "None";
		return `${this.name +"= tf.keras.layers.Flatten(" + res})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {

		let widgetsData= ["None",this.name];
		let widgetTypes=["data_format?","name"];

		this.genericDenseLayerUI(widgetsData,widgetTypes,node,navbar);

		node.addOutput("tf.layers.Layer","tf.layers.Layer");
	}
}

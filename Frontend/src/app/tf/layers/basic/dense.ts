import {TFLayers} from "../layers";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFDense extends TFLayers {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name} = tf.layers.dense(
			${this.widgets.find(element => element.type == "constant")?.value || "0"}, activation="relu", name = ${this.name}
	})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		let widgetsData= ["0","'linear'",true,"'glorot_uniform'","'zeros'","None","None","None","None","None",this.name];
		let widgetTypes=["units","activation?","use_bias?","kernel_initializer?","bias_initializer?","kernel_regularizer?","bias_regularizer?","activity_regularizer?","kernel_constraint?","bias_constraint?","name"];

		this.genericDenseLayerUI(widgetsData,widgetTypes,node,navbar);
		node.addOutput("tf.layers.Layer","tf.layers.Layer");
		node.size = [300,node.size[1]]
	}
}

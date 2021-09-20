import {TFLayers} from "../layers";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFLayerConv2d extends TFLayers {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name} = tf.layers.conv2d(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
	})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		let widgetsData= ["0","1","1","'valid'","None","1","1","None",true,"'glorot_uniform'","'zeros'","None","None","None","None","None",this.name];
		let widgetTypes=["filters","kernel_size","strides","padding?","data_format?","dilation_rate?","groups?","activation?","use_bias?","kernel_initializer?","bias_initializer?","kernel_regularizer?","bias_regularizer?","activity_regularizer?","kernel_constraint?","bias_constraint?","name"];

		this.genericDenseLayerUI(widgetsData,widgetTypes,node,navbar);
		node.addOutput("tf.layers.Layer","tf.layers.Layer");
		node.size = [300,node.size[1]]
	}
}

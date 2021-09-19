import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFIdentity extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.identity(" + this.GetNode(storageLinks, storageNodes, this.inputs[0].link)})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent){
		node.addInput("X", "tf.Tensor");
		let widgetsData= [this.name];
		let widgetTypes=["name"];
		this.genericCreationUIStructure(widgetsData,widgetTypes,node,navbar);
		node.addOutput("tf.Tensor", "tf.Tensor");
	}
}

import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFComplex extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks,storageNodes) {

		let node1=this.GetNode(storageLinks,storageNodes,this.inputs[0].link,"real","Complex");
		if(node1===""){
			return "undefined";
		}
		let node2=this.GetNode(storageLinks,storageNodes,this.inputs[1].link,"img","Complex");
		if(node2===""){
			return "undefined";
		}

		return `${this.name + " = tf.dtypes.complex("+
			node1+","+node2
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent){
		node.addInput("real", "tf.Tensor");
		node.addInput("img", "tf.Tensor");
		let widgetsData= [this.name];
		let widgetTypes=["name"];
		this.genericCreationUIStructure(widgetsData,widgetTypes,node,navbar);
		node.addOutput("tf.Tensor(complex)", "tf.Tensor");
	}
}

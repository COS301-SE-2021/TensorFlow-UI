import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFRange extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {

		let result = this.widgets.find(element => element.type == "start")?.value || "0";
		result +=","+ this.widgets.find(element => element.type == "limit")?.value || "0";
		let delta = this.widgets.find(element => element.type == "delta")?.value;
		let dType = this.widgets.find(element => element.type == "dtype?")?.value;

		let tempNumRows = result;
		if(delta || dType){
			result+=","+(delta?delta:tempNumRows)+","+(dType?dType:"float32");
		}

		return `${this.name} = tf.eye(${
			result
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that = this;
		const errorLink = "https://www.tensorflow.org/api_docs/python/tf/range";

		let widgetsData= ["0","0","None","float32"];
		let widgetTypes=["start","limit","delta","dtype?"];

		this.genericCreationUIStructure(widgetsData, widgetTypes, node, navbar);
		node.addOutput("tf.Tensor1D","tf.Tensor");
	}
}

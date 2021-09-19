import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFEye extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {

		let result = this.widgets.find(element => element.type == "numRows")?.value || "1";
		let numColumns = this.widgets.find(element => element.type == "numColumns?")?.value;
		let batchShape = this.widgets.find(element => element.type == "batchShape?")?.value;
		let dType = this.widgets.find(element => element.type == "dtype?")?.value;

		let tempNumRows = result;
		if(numColumns || batchShape || dType){
			result+=","+(numColumns?numColumns:tempNumRows)+","+(batchShape?batchShape:"None")+","+(dType?dType:"float32");
		}

		return `${this.name} = tf.eye(${
			result
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {

		let widgetsData = ["1", "1", "None", "float32"];
		let widgetTypes = ["numRows", "numColumns?", "batchShape?", "dtype?"];

		for (let i = 0; i < 4; ++i) {
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if (widget != null)
				widgetsData[i] = widget.value;
		}

		this.genericCreationUIStructure(widgetsData, widgetTypes, node, navbar);
		node.addOutput("tf.Tensor2D","tf.Tensor");
	}
}

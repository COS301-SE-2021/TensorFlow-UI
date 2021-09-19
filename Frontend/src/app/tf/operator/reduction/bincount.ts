import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFBincount extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.bincount(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link) + "," +
			this.widgets.find(element => element.type == "weights")?.value || "" + "," +
			this.widgets.find(element => element.type == "size")?.value || ""
	})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent)  {
		const that=this;
		node.addInput("x", "tf.Tensor");
		node.addInput("weight", "tf.Tensor");

		let widgetsData=["0"];
		let widgetTypes= ["axis?","keepDims?"];

		for(let i=0; i<2;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null) {
				widgetsData[i] = widget.value;
			}
		}

		node.addWidget("text",widgetTypes[0],widgetsData[0],function (value){

			if (that.checkIfNumber(value))
				that.changeWidgetValue(value, widgetTypes[0], navbar);
			else {
				alert("The size property has to be a non-negative integer");
			}
		});

		node.addOutput("tf.Tensor1D", "tf.Tensor");
	}
}

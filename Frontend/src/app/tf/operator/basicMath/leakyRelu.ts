import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFLeakyRelu extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let param1: string="";
		if(this.inputs!=null){
			param1 = this.GetNode(storageLinks,storageNodes,this.inputs[0].link);
		}
		let alpha = this.widgets.find(element => element.type == "alpha")?.value;
		if(!alpha){
			alpha="0";
		}

		return `${this.name} = tf.nn.leaky_relu(${param1},${alpha})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("x", "tf.Tensor");
		const that = this;

		let widgetsData= ["0.2"];
		let widgetTypes=["alpha"];

		for(let i=0; i<1;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text","alpha",widgetsData[0],function (value){
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value,widgetTypes[0],navbar);
			else{
				alert("The scaling factor has to be a number");
			}
		});
		node.addOutput("leakyRelu", "tf.Tensor");
	}
}

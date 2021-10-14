import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFDropout extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		let widgetsData= ["0.1","None","None",this.name];
		let widgetTypes=["rate","noise_shape","seed","name"];

		return (this.name+" = tf.nn.dropout("+
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link)+","+
			(this.widgets.find(element => element.type == widgetTypes[0])?.value || widgetsData[0])+","+
			(this.widgets.find(element => element.type == widgetTypes[1])?.value || widgetsData[1])+","+
			(this.widgets.find(element => element.type == widgetTypes[2])?.value || widgetsData[2])+")"
		);
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("x", "tf.Tensor");
		node.addOutput("dropout", "tf.Tensor");

		let widgetsData= ["0.1","None","None",this.name];
		let widgetTypes=["rate","noise_shape","seed","name"];

		for(let i=0; i<widgetTypes.length;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text", widgetTypes[0], widgetsData[0], (value) => {
			if(this.isInputANumber(value))
				this.changeWidgetValue(value, widgetTypes[0],navbar);
			else
				this.resetWidgetValueToLast(widgetTypes[0],node,widgetsData[0]);
		});
		node.addWidget("text", widgetTypes[1], widgetsData[1], (value) => {
			if(this.checkIfWidgetTypeIsAVectorArray(value,widgetTypes[1])){
				this.changeWidgetValue(value, widgetTypes[1],navbar);
			}
			else
				this.resetWidgetValueToLast(widgetTypes[1],node,widgetsData[1]);
		});
		node.addWidget("text", widgetTypes[2], widgetsData[2], (value) => {
			if(this.isInputAnInteger(value))
				this.changeWidgetValue(value, widgetTypes[2],navbar);
			else
				this.resetWidgetValueToLast(widgetTypes[2],node,widgetsData[2]);
		});
		node.addWidget("text","name",this.name,(value) => {
			this.changeWidgetValue(value,"name",navbar,node);
		});
	}

	isInputANumber(value){
		if(!isNaN(Number(value)))
			return true;
		else {
			alert("The rate type has to be a number, which represents the probability that each element is dropped");
			return false;
		}
	}

	isInputAnInteger(value){
		if(!isNaN(Number(value))){
			const newNum = +value;
			if(Number.isInteger(newNum))
				return true;
		}
		alert("The seed type has to be an integer.  Used to create random seeds. ");
		return false;
	}
}

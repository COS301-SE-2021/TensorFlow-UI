import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

// tf.cumsum (x, axis?, exclusive?, reverse?)

export class TFCumSum extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {

		const link = storageLinks.find(element => element.id == this.inputs[0].link);
		const inputNode = storageNodes.find(element => element.id == link?.origin_id);

		if(!inputNode){
			alert("The x input is required for the CumSum operation")
			return;
		}
		let res=inputNode.name;

		if(this.widgets.length>0){
			let temp1 = this.widgets.find(element => element.type === "axis?")?.value;
			if(!temp1)
				temp1="0";
			res+=","+temp1;

			let temp2 = this.widgets.find(element => element.type === "exclusive?")?.value;
			if(!temp2)
				res+=",false";
			else
				res+=","+temp2;

			let temp3 = this.widgets.find(element => element.type === "reverse?")?.value;
			if(!temp3)
				res+=",false";
			else
				res+=","+temp3;
		}

		return `${this.name + "= tf.math.cumsum("+
			res
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that=this;
		node.addInput("x", "tf.Tensor");

		let widgetsData= ["0",false,false];
		let widgetTypes=["axis?","exclusive?","reverse?"];

		for(let i=0; i<3;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text","axis?",widgetsData[0],function (value){
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value,widgetTypes[0],navbar);
			else{
				alert("The axis attribute has to be a number");
				return;
			}
		});
		node.addWidget("toggle",widgetTypes[1],widgetsData[1],function (value){
			that.changeWidgetValue(value,widgetTypes[1],navbar);
		});
		node.addWidget("toggle",widgetTypes[2],widgetsData[2],function (value){
			that.changeWidgetValue(value,widgetTypes[2],navbar);
		});

		node.addOutput("tf.Tensor", "tf.Tensor");
	}

}

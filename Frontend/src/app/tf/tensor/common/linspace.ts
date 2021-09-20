import { TFTensor } from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFLinspace extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		let result="";
		result+=this.widgets.find(element => element.type == "start")?.value || "0"+",";
		result+=this.widgets.find(element => element.type == "stop")?.value || "1"+",";
		result+=this.widgets.find(element => element.type == "num")?.value || "1";

		return `${this.name+ " = tf.linspace("+result})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent){
		const that = this;

		let widgetsData= ["0","1","1",this.name];
		let widgetTypes=["start","stop","num","name"];

		for(let i=0; i<4;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text",widgetTypes[0],widgetsData[0],function (value){
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value,widgetTypes[0],navbar);
			else
				that.resetWidgetValueToLast(widgetTypes[0],node,widgetsData[0]);
		});
		node.addWidget("text",widgetTypes[1],widgetsData[1],function (value){
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value,widgetTypes[1],navbar);
			else
				that.resetWidgetValueToLast(widgetTypes[1],node,widgetsData[1]);
		});
		node.addWidget("text",widgetTypes[2],widgetsData[2],function (value){
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value,widgetTypes[2],navbar);
			else
				that.resetWidgetValueToLast(widgetTypes[2],node,widgetsData[2]);
		});
		node.addWidget("text",widgetTypes[3],widgetsData[3],function (value){
			that.changeWidgetValue(value,widgetTypes[3],navbar,node);
		});
		node.addOutput("tf.Tensor","tf.Tensor");
	}
}

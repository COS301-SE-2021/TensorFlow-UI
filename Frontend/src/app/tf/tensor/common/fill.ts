import { TFTensor } from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFFill extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
		let result="";
		result+=this.widgets.find(element => element.type == "shape")?.value || (alert("the shape argument is required for the Fill"));
		if(result=="undefined")
			return result;
		result+=","+this.widgets.find(element => element.type == "value")?.value || (alert("the value argument is required for the Fill"));
		if(result=="undefined")
			return result;

		let dType = this.widgets.find(element => element.type == "dtype?")?.value;
		if(dType){
			result += ",'"+ dType+"'";
		}

		return `${this.name+ " = tf.fill("+result})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent){
		const that = this;

		let widgetsData= ["shape","value","float",this.name];
		let widgetTypes=["shape","value","dtype?","name"];

		for(let i=0; i<4;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text",widgetTypes[0],widgetsData[0],function (value){
			if(that.checkIfWidgetTypeIsAVectorArray(value,widgetTypes[0]))
				that.changeWidgetValue(value,widgetTypes[0],navbar);
			else
				that.resetWidgetValueToLast(widgetTypes[0],node,widgetsData[0]);
		});

		node.addWidget("text",widgetTypes[1],widgetsData[1],function (value){
			let stringRegExp = new RegExp('^("[a-zA-Z][a-zA-Z0-9]*")*$');
			if(that.checkIfNumber(value) || stringRegExp.test(value))
				that.changeWidgetValue(value,widgetTypes[1],navbar);
			else {
				alert("The value attribute needs to be scalar of type number|string.");
				that.resetWidgetValueToLast(widgetTypes[1], node, widgetsData[1]);
			}
		});
		node.addWidget("combo",widgetTypes[2],widgetsData[2],function (value){
			that.changeWidgetValue(value,widgetTypes[2],navbar);
		},{values: ["float","float32","int32","bool","complex64","string"]});

		node.addWidget("text",widgetTypes[3],widgetsData[3],function (value){
			that.changeWidgetValue(value,widgetTypes[3],navbar,node);
		});
		node.addOutput("Value","tf.Tensor");
	}

}

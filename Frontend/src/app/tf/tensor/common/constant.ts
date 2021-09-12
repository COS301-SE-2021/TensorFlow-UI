import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {widgetStructure} from "../../node";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFConstant extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(data, name);
	}

	code() {
		let result: string = "";

		let nodeValue: String = "0";

		let constantArg = this.widgets.find(element => element.type == "Value");
		if(constantArg==undefined){
			nodeValue = "0";
		}
		else{
			nodeValue = constantArg.value;
		}
		result+=nodeValue;

		let dType = this.widgets.find(element => element.type == "dtype");
		if(dType!=undefined) {
			result+=","+dType.value;
		}

		let shape = this.widgets.find(element => element.type == "shape");
		if(shape!=undefined) {
			result+=","+shape.value;
		}

		let constName = this.widgets.find(element => element.type == "name");
		if(constName!=undefined) {
			result+=","+constName.value;
		}
		this.returnValue += nodeValue;

		return `${this.name} = tf.constant(${
			result
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that = this;

		let widgetsData= ["0","float","shape","name"];
		let widgetTypes=["Value","dtype","shape","name"];

		for(let i=0; i<4;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text","Value",widgetsData[0],function (value){
			that.changeWidgetValue(value,widgetTypes[0],navbar);
			that.checkTensorInputType(value);
		});
		node.addWidget("combo","dtype(optional)",widgetsData[1],function (value){
			that.changeWidgetValue(value,widgetTypes[1],navbar);
		},{values: ["float","float32","int32","bool","complex64","string"]});
		node.addWidget("text","shape(optional)",widgetsData[2],function (value){
			that.changeWidgetValue(value,widgetTypes[2],navbar)
		});
		node.addWidget("text","name(optional)",widgetsData[3],function (value){
			that.changeWidgetValue(value,widgetTypes[3],navbar)
		});

		node.addOutput("Value","tf.Tensor");
	}

}

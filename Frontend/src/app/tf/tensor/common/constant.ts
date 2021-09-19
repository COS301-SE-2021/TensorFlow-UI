import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {widgetStructure} from "../../node";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";
import {userVariableNames} from "../../userVariableNames";

export class TFConstant extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(data, name);
	}

	code() {

		let result="";
		result+=this.widgets.find(element => element.type == "value")?.value || "0";

		let dType = this.widgets.find(element => element.type == "dtype?")?.value;
		let shape= this.widgets.find(element => element.type == "shape?")?.value;
		if(dType){
			result += ",'"+ dType+"'"+(shape? ","+shape : "");
		}
		else if(shape){
			result += ","+ (dType? "'"+dType+"'" : "None")+","+shape;
		}

		return `${this.name+ " = tf.constant("+result})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that = this;

		let widgetsData= ["0","None","None",this.name];
		let widgetTypes=["value","dtype?","shape?","name"];

		for(let i=0; i<4;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text",widgetTypes[0],widgetsData[0],function (value){
			if(that.checkTensorInputType(value))
				that.changeWidgetValue(value,widgetTypes[0],navbar);
			else {
				that.resetWidgetValueToLast(widgetTypes[0], node, widgetsData[0]);
			}
		});
		node.addWidget("combo",widgetTypes[1],widgetsData[1],function (value){
			that.changeWidgetValue(value,widgetTypes[1],navbar);
		},{values: ["None","float","float32","float64","bool","int16","int32","int64","complex64","complex128","string"]});
		node.addWidget("text",widgetTypes[2],widgetsData[2],function (value){
			if(that.checkIfWidgetTypeIsAVectorArray(value,widgetTypes[2]))
				that.changeWidgetValue(value,widgetTypes[2],navbar);
			else
				that.resetWidgetValueToLast(widgetTypes[2],node,widgetsData[2]);
		});
		node.addWidget("text",widgetTypes[3],widgetsData[3],function (value){
			that.changeWidgetValue(value,widgetTypes[3],navbar,node);
		});
		node.addOutput("Value","tf.Tensor");
		node.size = [220,node.size[1]]
	}

}

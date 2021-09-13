import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFRange extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code() {
	// 	return `${this.name} = tf.range(
	// 		${this.widgets.find(element => element.type == "start")?.value || "0"},
	// 		${this.widgets.find(element => element.type == "stop")?.value || "0"},
	// 		${this.widgets.find(element => element.type == "step")?.value || "shape=inferred"}
	// 		${this.widgets.find(element => element.type == "dtype")?.value || "dtype=None"}
	// })`;}


	// UIStructure(node: LGraphNode) {
	// 	node.addWidget("number","start",0,(value) => {
	// 		this.changeWidgetValue(value,"start");});
	// 	node.addWidget("number","stop",0,(value) => {
	// 		this.changeWidgetValue(value,"stop");});
	// 	node.addWidget("number","step",1,(value) => {
	// 		this.changeWidgetValue(value,"step");});
	// 	node.addOutput("linspace sequence","tf.Tensor");
	// }
		let result: string = "";

		let start = this.widgets.find(element => element.type == "start");
		if(start==undefined)
			result = "1";
		else
			result = start.value;

		let step = this.widgets.find(element => element.type == "step");
		if(step==undefined) {
			result +=","+"1";
		}
		else{
			result+=","+step.value;
		}

		let dType = this.widgets.find(element => element.type == "dtype");
		if(dType!=undefined) {
			result+=","+dType.value;
		}
		this.returnValue = "tf.Tensor1D";

		return `${this.name} = tf.range(${
			result
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that = this;
		const errorLink = "https://www.tensorflow.org/api_docs/python/tf/range";

		let widgetsData= ["0","1","1","float32"];
		let widgetTypes=["start","stop","step","dtype"];

		for(let i=0; i<4;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text","start",widgetsData[0],function (value){
			value = value.trim();
			if(that.checkIfNumber(value) && Number.isInteger(Number(value)))
				that.changeWidgetValue(value, widgetTypes[0], navbar);
			else{
				console.log("Error - 'start' can only be an integer");
				//TODO - Throw error
			}
		});
		node.addWidget("text","stop",widgetsData[1],function (value){
			value = value.trim();
			if(that.checkIfNumber(value) && Number.isInteger(Number(value)))
				that.changeWidgetValue(value, widgetTypes[1], navbar);
			else{
				console.log("Error - 'stop' can only be an integer");
				//TODO - Throw error
			}
		});
		node.addWidget("text","step(optional)",widgetsData[2],function (value){
			value = value.trim();
			if(that.checkIfNumber(value) && Number.isInteger(Number(value)))
				that.changeWidgetValue(value, widgetTypes[2], navbar);
			else{
				console.log("Error - 'step' can only be an integer");
				//TODO - Throw error
			}
		});
		node.addWidget("combo","dtype(optional)",widgetsData[3],function (value){
			that.changeWidgetValue(value,widgetTypes[3],navbar);
		},{values: ["float32","float32","int32"]});

		node.addOutput("tf.Tensor1D","tf.Tensor");
	}
}

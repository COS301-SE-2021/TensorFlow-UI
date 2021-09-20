import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFClipByValue extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let param1: string="";
		if(this.inputs!=null){
			param1 = this.GetNode(storageLinks,storageNodes,this.inputs[0].link);
			if(!param1){
				alert("x input required");
				return;
			}
		}
		let min = this.widgets.find(element => element.type == "clip_value_min")?.value;
		let max = this.widgets.find(element => element.type == "clip_value_max")?.value;
		if(!min){
			min="0";
		}
		if(!max){
			max="1";
		}

		return `${this.name} = tf.clip_by_value(${param1},${min},${max})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that = this;
		node.addInput("x", "tf.Tensor");
		let errorMessage = "Lower-bound and Upper-bound range to be clipped to, need to both be numbers";

		let widgetsData= ["0","1"];
		let widgetTypes=["clip_value_min","clip_value_max"];

		for(let i=0; i<2;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text","clip_value_min",widgetsData[0],function (value){
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value,widgetTypes[0],navbar);
			else{
				alert(errorMessage);
			}
		});

		node.addWidget("text","clip_value_max",widgetsData[1],function (value){
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value,widgetTypes[1],navbar);
			else{
				alert(errorMessage);
			}
		});
		this.createNodeNameWidget(node,navbar);
		node.addOutput("max(min(x, clip_value_max), clip_value_min)", "tf.Tensor");
	}


}

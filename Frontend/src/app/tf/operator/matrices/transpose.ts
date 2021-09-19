import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFTranspose extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes){

		let res = "";
		res = this.GetNode(storageLinks,storageNodes,this.inputs[0].link);
		if(res==="") {
			return;
		}

		if(this.widgets.length>0){
			let temp = this.widgets.find(element => element.type == "perm?")?.value;
			if(temp==undefined)
				temp="[1]";
			res +=","+temp;

			let temp2= this.widgets.find(element => element.type == "conjugate?")?.value;
			if(temp2==undefined)
				res+=",false";
			else
				res +=","+temp2;
		}

		return `${this.name + "tf.transpose("+
			res
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that=this;
		node.addInput("x", "tf.Tensor");

		let widgetsData=["[1]",false];
		let widgetTypes= ["perm?","conjugate?"];

		for(let i=0; i<2;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null) {
				widgetsData[i] = widget.value;
			}
		}

		node.addWidget("text","perm?",widgetsData[0], function (value) {
			if(that.checkIfWidgetTypeIsAVectorArray(value,"perm?"))
				that.changeWidgetValue(value, widgetTypes[0],navbar);
		});
		node.addWidget("toggle","conjugate?",widgetsData[1],function (value){
			that.changeWidgetValue(value,widgetTypes[1],navbar);
		});
		node.addOutput("tf.Tensor", "tf.Tensor");
	}

}

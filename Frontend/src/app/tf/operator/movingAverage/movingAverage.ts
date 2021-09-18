import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFMovingAverage extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {

		let v = this.GetNode(storageLinks,storageNodes,this.inputs[0].link);
		if(v==""){
			return;
		}
		let x = this.GetNode(storageLinks,storageNodes,this.inputs[1].link);
		if(x==""){
			return;
		}

		let res = v+","+x;
		let temp = this.widgets.find(element => element.type == "decay")?.value;
		if(temp==undefined)
			temp="0.95";
		res +=","+temp;
		if(this.widgets.length>0){

			let temp2= this.widgets.find(element => element.type == "step?")?.value;
			if(temp2==undefined)
				temp2="1";
			res +=","+temp2;

			let temp3 = this.widgets.find(element => element.type == "zeroDebias?")?.value;
			if(temp3==undefined)
				res+=",false";
			else
				res += ","+temp3;
		}

		return `${this.name + "= tf.movingAverage(" +
			res
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that=this;
		node.addInput("v", "tf.Tensor")
		node.addInput("x", "tf.Tensor");

		let widgetsData=["0.95","1","true"];
		let widgetTypes= ["decay","step?","zeroDebias?"];

		for(let i=0; i<3;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null) {
				widgetsData[i] = widget.value;
			}
		}

		node.addWidget("text",widgetTypes[0],widgetsData[0],function (value){
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value,widgetTypes[0],navbar);
			else{
				alert("The decay property has to be a number");
			}
		});
		node.addWidget("text",widgetTypes[1],widgetsData[1],function (value){
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value,widgetTypes[1],navbar);
			else{
				alert("The step property has to be a number");
			}
		});
		node.addWidget("toggle", widgetTypes[2], widgetsData[2],  function (value){
			that.changeWidgetValue(value, widgetsData[2],navbar);
		});
		node.addOutput(" v += delta", "tf.Tensor");
	}
}

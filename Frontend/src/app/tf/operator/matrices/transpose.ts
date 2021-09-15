import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFTranspose extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes){
		return `${this.name + "tf.transpose("+
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link)+","+
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link)+")"
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that=this;
		node.addInput("x", "tf.Tensor");

		let widgetsData=["[1]",false];
		let widgetTypes= ["perm?","conjugate"];

		for(let i=0; i<2;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null) {
				widgetsData[i] = widget.value;
			}
		}

		node.addWidget("text",widgetTypes[0],widgetsData[0], function (value) {
			if(that.checkIfPermIsVectorArray(value))
				that.changeWidgetValue(value, widgetTypes[0],navbar);
		});
		node.addWidget("toggle",widgetTypes[1],widgetsData[1],function (value){
			that.changeWidgetValue(value,widgetTypes[1],navbar);
		});
		node.addOutput("tf.Tensor", "tf.Tensor");
	}

	checkIfPermIsVectorArray(value:string):boolean{
		value.trim();

		if(value.length>1){
			if(value.charAt(0)!=='[' || value.charAt(value.length-1)!==']'){
				alert("The permutation of the dimensions of x, has to be a vector array of type number[]")
				return false;
			}
			else{
				value = value.substring(1,value.length-1);
				let newVal = value.split(',');
				for(let elem of newVal){
					if(isNaN(Number(elem))){
						alert("The permutation of the dimensions of x, has to be a vector array of type number[]")
						return false;
					}
				}
			}
		}
		else{
			alert("The permutation of the dimensions of x, has to be a vector array of type number[]")
			return false;
		}
		return true;
	}

}

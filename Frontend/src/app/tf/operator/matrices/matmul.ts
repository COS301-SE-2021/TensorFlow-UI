import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";
import {TFNode} from "../../node";

export class TFMatMul extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {

		let parameters: TFNode[] = [];
		let dTypeArray: string[] = [];

		for(let input of this.inputs){
			const link = storageLinks.find(element => element.id == input.link);
			const inputNode = storageNodes.find(element => element.id == link?.origin_id);
			parameters.push(inputNode);

			if(inputNode){
				for(let widget of inputNode.widgets){
					if(widget.type === "dtype" || widget.type==="dtype?"){
						dTypeArray.push( widget.value);
						break;
					}
				}
			}
			else {
				alert("Both input nodes (t1 and t2) are required");
				return;
			}
		}

		if((dTypeArray[0] !== "float32") && (dTypeArray[0] !== "float64")){
			alert("Input t1 must be of type float32 or float64 in the MAtMul class");
			return;
		}
		else if(dTypeArray[0] !== dTypeArray[1]){
			alert("Input t2 must have the same dtype as t1");
			return;
		}

		let result="";
		result = <string>parameters[0].name+","+parameters[1].name;
		let widgetTypes= ["transpose_a","transpose_b","adjoint_a","adjoint_b"];
		let widgetsSearch = this.widgets.find(element => element.type === widgetTypes[0] || widgetTypes[1] || widgetTypes[2] || widgetTypes[3]);
		if(widgetsSearch!=null){
			for(let i=0; i<4;++i){
				let widget = this.widgets.find(element => element.type === widgetTypes[i])?.value;
				if(widget!=undefined){
					result+=","+widget;
				}
				else{
					result+=","+"false";
				}
			}
		}

		return `${this.name + " = tf.matmul("
			+result+")"
		}`;

	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that =this;
		node.addInput("t1", "tf.Tensor");
		node.addInput("t2", "tf.Tensor");

		let widgetsData=[false,false,false,false];
		let widgetTypes= ["transpose_a","transpose_b","adjoint_a","adjoint_b"];

		for(let i=0; i<4;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = Boolean(widget.value);
		}

		for(let i=0; i<4;++i){
			node.addWidget("toggle",widgetTypes[i],widgetsData[i],function (value){
				that.changeWidgetValue(value,widgetTypes[i],navbar);
			});
		}

		node.addOutput("t1.t2", "tf.Tensor");
		node.addWidget("text","name",this.name,(value) => {
			this.changeWidgetValue(value,"name",navbar,node);
		});
	}
}

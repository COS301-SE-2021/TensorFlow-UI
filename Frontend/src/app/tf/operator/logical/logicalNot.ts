import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";
import {TFNode} from "../../node";

export class TFLogicalNot extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		let result = this.logicalNotHelper(storageLinks,storageNodes);
		if(result==""){
			return;
		}
		return `${this.name + "= tf.math.logical_not("+
		result+
		")"}`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("x", "tf.Tensor");
		node.addOutput("NOT x", "tf.Tensor");
		node.addWidget("text","name",this.name,(value) => {
			this.changeWidgetValue(value,"name",navbar,node);
		});
	}

	logicalNotHelper(storageLinks,storageNodes):string{
		let parameters: TFNode[] = [];

		for(let input of this.inputs){
			const link = storageLinks.find(element => element.id == input.link);
			const inputNode = storageNodes.find(element => element.id == link?.origin_id);
			parameters.push(inputNode);
			if(inputNode){
				if(this.getDType(inputNode.widgets) !== "bool"){
					alert("The x input must be of dtype bool, for the not operator");
					return "";
				}
			}
			else {
				alert("Input nodes x is required for the logicalNot operation");
				return "";
			}
		}

		return <string>parameters[0].name;
	}

}


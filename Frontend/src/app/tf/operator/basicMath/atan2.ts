import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";
import {TFNode} from "../../node";

export class TFAtan2 extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let parameters: TFNode[] = [];
		let dTypeArray: string[] = [];

		for(let input of this.inputs){
			const link = storageLinks.find(element => element.id == input.link);
			const inputNode = storageNodes.find(element => element.id == link?.origin_id);
			parameters.push(inputNode);

			if(inputNode){
				for(let widget of inputNode.widgets){
					if(widget.type === "dtype"){
						dTypeArray.push( widget.value);
						break;
					}
				}
			}
			else {
				alert("Both input nodes (a and b) are required");
				return "";
			}
		}
		console.log(parameters)
		console.log(dTypeArray);

		return `${this.name} = tf.math.atan2()`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent)  {
		node.addInput("x", "tf.Tensor");
		node.addInput("b", "tf.Tensor");
		this.createNodeNameWidget(node,navbar);
		node.addOutput("atan2(a,b)", "tf.Tensor");
	}
}

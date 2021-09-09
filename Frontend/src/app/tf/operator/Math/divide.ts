import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {Store} from "@ngxs/store";
import {WorkspaceState} from "../../../../Storage/workspace";
import {TFNode} from "../../node";

export class TFDivide extends TFOperator {
	constructor(public name: string | undefined = undefined,private store: Store) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let param1: string = "1";
		let param2: string = "1";

		let param1DType: string = "float";
		let param2DType: string = "float";
		let denominatorValue: string = param2;
		let errorInputArray: TFNode[] = [];

		for(let i=0; i<this.inputs.length; ++i){
			let input = this.inputs[i];
			if(input.link!=null){

				const link = storageLinks.find(element => element.id ==input.link);
				const inputNode = storageNodes.find(element => element.id == link.origin_id);

				if(i==0) {
					param1 = inputNode.name;
					param1DType = this.getDType(inputNode.widgets);
				}
				else {
					param2 = inputNode.name;
					denominatorValue = "0";
					errorInputArray.push(inputNode);

					for(let widget of inputNode.widgets){
						//Check if 2nd input is the same as the first
						if(widget.type === "dtype"){
							param2DType = widget.value;
						}
						if(widget.type === "constant"){
							denominatorValue = widget.value;
						}
					}
				}
			}
		}

		if(param1DType !== param2DType){
			//TODO - THROW ERROR
			let errorMessage = "The second tensor input(B), which is a denominator, must have the same dtype as the first tensor input(A)";

			console.log(errorMessage);
		}
		if(denominatorValue === "0"){
			//TODO - THROW ERROR
			//Maybe highlight the node
			let errorMessage = "Division by zero is not allowed";
			console.log(errorMessage);
		}
		return `${this.name} = tf.math.divide(${param1},${param2})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A", "tf.Tensor");
		node.addInput("B", "tf.Tensor");
		node.addOutput("A/B", "tf.Tensor");
	}
}

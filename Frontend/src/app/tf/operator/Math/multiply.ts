import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMultiply extends TFOperator {
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		let param1: string = "1";
		let param2: string = "1";
		let param1DType: string = "float";
		let param2DType: string = "float";

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
					param2DType = this.getDType(inputNode.widgets);

				}
			}
		}

		if(param1DType !== param2DType){
			//TODO - THROW ERROR
			let errorMessage = "The second tensor input(B) to multiply, must have the same dtype as the first tensor input(A)";
			console.log(errorMessage);
		}

		return `${this.name} = tf.math.multiply(${param1},${param2})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A", "tf.Tensor");
		node.addInput("B", "tf.Tensor");
		node.addOutput("A*B", "tf.Tensor");
	}
}

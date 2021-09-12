import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";

export class TFComplex extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks,storageNodes) {

		let param1: string = "0";
		let param2: string = "0";

		for(let i=0; i<this.inputs.length; ++i){
			let input = this.inputs[i];
			if(input.link!=null){

				const link = storageLinks.find(element => element.id ==input.link);
				const inputNode = storageNodes.find(element => element.id == link.origin_id);

				if(i==0) {
					param1 = inputNode.name;
				}
				else {
					param2 = inputNode.name;
				}
			}
		}
		this.returnValue = param1+","+param2;
		return `${this.name} = tf.complex(${param1},${param2})`;
	}
	UIStructure(node: LGraphNode){
		node.addInput("Real", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("Imag", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("Complex", "tf.Tensor");
	}
}

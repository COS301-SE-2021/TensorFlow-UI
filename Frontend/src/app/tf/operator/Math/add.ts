import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {WorkspaceState} from "../../../../Storage/workspace";
import {Store, Select} from "@ngxs/store";
import {OnInit} from "@angular/core";

export class TFAdd extends TFOperator{
	constructor(
		public name: string | undefined = undefined,private store: Store) {
		super(name);
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
		return `${this.name} = tf.math.add(${param1},${param2})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("B", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("A+B", "tf.Tensor");
	}
}

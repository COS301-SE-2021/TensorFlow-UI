import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFDiag extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}


	// code(storageLinks, storageNodes) {
	// 	return `${this.name + "= tf.diag(" +
	// this.GetNode(storageLinks, storageNodes, this.inputs[0].link))`;
	// }
	//
	// UIStructure(node: LGraphNode,navbar?:NavbarComponent){
	// 	node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
	// 	node.addOutput(" tf.Tensor", "tf.Tensor");
	code(storageLinks,storageNodes) {
		let param: string = "0";

		let input = this.inputs[0];
		if(input.link!=null){

			const link = storageLinks.find(element => element.id ==input.link);
			const inputNode = storageNodes.find(element => element.id == link.origin_id);

			param = inputNode.name;
		}

		return `${this.name} = tf.diag(${param})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent){
		node.addInput("X","tf.Tensor");
		node.addOutput("tf.Tensor","tf.Tensor");
	}
}

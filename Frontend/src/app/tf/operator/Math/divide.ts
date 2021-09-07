import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {Store} from "@ngxs/store";
import {WorkspaceState} from "../../../../Storage/workspace";

export class TFDivide extends TFOperator {
	constructor(public name: string | undefined = undefined,private store: Store) {
		super(name);
	}

	code() {

		let param1: string = "1";
		let param2: string = "1";
		const links = this.store.selectSnapshot(WorkspaceState).links;
		const nodes = this.store.selectSnapshot(WorkspaceState).TFNode;

		for(let i=0; i<this.inputs.length; ++i){
			let input = this.inputs[i];
			if(input.link!=null){

				const link = links.find(element => element.id ==input.link);
				const inputNode = nodes.find(element => element.id == link.origin_id);

				if(i==0)
					param1 = inputNode.name;
				else
					param2 = inputNode.name;
			}
		}

		return `${this.name} = tf.math.divide(
			${param1} , ${param2}
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("A", "tf.Tensor");
		node.addInput("B", "tf.Tensor");
		node.addOutput("A/B", "tf.Tensor");
	}
}

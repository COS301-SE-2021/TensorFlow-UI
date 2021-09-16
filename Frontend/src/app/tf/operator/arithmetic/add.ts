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

		let res = this.genericArithmeticCode(storageLinks,storageNodes,"Add");
		if(res=="")
			return;

		return `${this.name + "= tf.math.add("+
			res
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("a", "tf.Tensor");
		node.addInput("b", "tf.Tensor");
		node.addOutput("a+b", "tf.Tensor");
	}
}

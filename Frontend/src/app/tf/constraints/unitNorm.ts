import {TFConstraint} from "./classes";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../Components/navbar/navbar.component";

export class TFUnitNorm extends TFConstraint {

	protected constructor(
		public data: number | undefined = undefined,
		public name: string | undefined = undefined
	) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name} = tf.constraints.unitNorm(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
	})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("args", "Object"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("tf.constraints.Constraint", "tf.Tensor");
	}
}

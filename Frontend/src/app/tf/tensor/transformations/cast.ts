// tf.cast (x, dtype)
import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFCast extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name} = tf.cast(
		${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
			${this.widgets.find(element => element.type == "dtype")?.value || "dtype=None"}
	})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("combo", "dtype", "float", (value) => {
			this.changeWidgetValue(value, "dtype");
		}, {values: ["float32", "int32", "bool", "complex64", "string"]});
		node.addOutput("cast", "tf.Tensor");
	}
}

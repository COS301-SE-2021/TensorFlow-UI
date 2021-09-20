import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFSparseToDense extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes) {
		return `${this.name + "= tf.sparseToDense(" +
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link) + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link) + "," +
			this.widgets.find(element => element.type == "outputShape")?.value || "" + "," +
			this.GetNode(storageLinks, storageNodes, this.inputs[2].link)
		})`;
	}

	UIStructure(node: LGraphNode) {
		node.addInput("sparseIndices", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("sparseValues", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("text", "outputShape?", "[]", (value) => {
			this.changeWidgetValue(value, "outputShape");
		});
		node.addInput("defaultValue", "tf.Scalar"); //should be tf.Tensor|TypedArray|Array
		node.addOutput("tf.Tensor(optional)", "tf.Tensor"); //Returns: tf.Tensor3D|tf.Tensor4D
	}

}

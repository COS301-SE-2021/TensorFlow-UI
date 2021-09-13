
import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";

export class TFMatMul extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks, storageNodes){
		return `${this.name} = tf.matMul(
			${this.GetNode(storageLinks, storageNodes, this.inputs[0].link)},
			${this.GetNode(storageLinks, storageNodes, this.inputs[1].link)},
			${this.widgets.find(element => element.type == "transposeA")?.value || ""}
			${this.widgets.find(element => element.type == "transposeB")?.value || ""}
		})`;
	}

	UIStructure(node: LGraphNode) {
		const that = this;
		node.addInput("A", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addInput("B", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array
		node.addWidget("toggle","transposeA","",function (value){ that.changeWidgetValue(value,"transposeA")},{values: [true,false]});
		node.addWidget("toggle","transposeB","",function (value){ that.changeWidgetValue(value,"transposeB")},{values: [true,false]});
		node.addOutput("A+B", "tf.Tensor");
	}
}

import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFAvgPool3D extends TFOperator {

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes){
		let widgetsData= ["2","1",'"SAME"','"NDHWC"',this.name];
		let widgetTypes=["ksize","strides","padding","data_format","name"];

		return (this.name+" = tf.nn.avg_pool3d("+
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link)+","+
			(this.widgets.find(element => element.type == widgetTypes[0])?.value || widgetsData[0])+","+
			(this.widgets.find(element => element.type == widgetTypes[1])?.value || widgetsData[1])+","+
			(this.widgets.find(element => element.type == widgetTypes[2])?.value || widgetsData[2])+","+
			(this.widgets.find(element => element.type == widgetTypes[3])?.value || widgetsData[3])+")"
		);
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("X","tf.Tensor");
		node.addOutput("Tensor4D|Tensor5D","tf.Tensor");

		let widgetsData= ["2","1",'"SAME"','"NDHWC"',this.name];
		let widgetTypes=["ksize","strides","padding","data_format","name"];

		this.genericConvolutionUIStructure(widgetsData,widgetTypes,node,navbar);
		node.size = [220,node.size[1]]
	}

}

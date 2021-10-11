import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFConv3dtranspose extends TFOperator{

	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes){
		let widgetsData= ["[1]","1",'"SAME"','"NDHWC"',"None",this.name];
		let widgetTypes=["output_shape","strides","padding","data_format","dilations","name"];

		return (this.name+" = tf.nn.conv3d_transpose("+
			this.GetNode(storageLinks, storageNodes, this.inputs[0].link)+","+
			this.GetNode(storageLinks, storageNodes, this.inputs[1].link)+","+
			(this.widgets.find(element => element.type == widgetTypes[0])?.value || widgetsData[0])+","+
			(this.widgets.find(element => element.type == widgetTypes[1])?.value || widgetsData[1])+","+
			(this.widgets.find(element => element.type == widgetTypes[2])?.value || widgetsData[2])+","+
			(this.widgets.find(element => element.type == widgetTypes[3])?.value || widgetsData[3])+","+
			(this.widgets.find(element => element.type == widgetTypes[4])?.value || widgetsData[4])+")"
		);
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		node.addInput("Input","tf.Tensor");
		node.addInput("Filters","tf.Tensor");
		node.addOutput("Tensor3D|Tensor4D","tf.Tensor");

		let widgetsData= ["[1]","1",'"SAME"','"NDHWC"',"None",this.name];
		let widgetTypes=["output_shape","strides","padding","data_format","dilations","name"];

		this.genericConvolutionUIStructure(widgetsData,widgetTypes,node,navbar);
		node.size = [250,node.size[1]]
	}

}





import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFVariable extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string | undefined = undefined) {
		super(data, name);
	}

	code(storageLinks,storageNodes)  {

		let res = "";
		res = this.GetNode(storageLinks,storageNodes,this.inputs[0].link);
		if(res=="")
			return "undefined";


		let trainable= this.widgets.find(element => element.type == "shape?")?.value;
		let dType = this.widgets.find(element => element.type == "dtype?")?.value;
		if(trainable){
			res += ","+ (dType? "'"+dType+"'" : "None")+","+trainable;
		}
		else if(dType){
			res += ",'"+ dType+"'"+(trainable? ","+trainable : "true");
		}

		return `${this.name +" = tf.variable("+res
		})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that = this;

		let widgetsData= ["0",true,"None",this.name];
		let widgetTypes=["value","trainable?","dtype?","name"];

		for(let i=0; i<4;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text",widgetTypes[0],widgetsData[0],function (value){
			if(that.checkTensorInputType(value))
				that.changeWidgetValue(value,widgetTypes[0],navbar);
			else {
				that.resetWidgetValueToLast(widgetTypes[0], node, widgetsData[0]);
			}
		});
		node.addWidget("toggle",widgetTypes[1],widgetsData[1],function (value){
			that.changeWidgetValue(value,widgetTypes[1],navbar);
		});
		node.addWidget("combo",widgetTypes[2],widgetsData[2],function (value){
			that.changeWidgetValue(value,widgetTypes[2],navbar);
		},{values: ["None","'float32'","'int32'","'bool'","'complex64'","'string'"]});
		node.addWidget("text",widgetTypes[3],widgetsData[3],function (value){
			that.changeWidgetValue(value,widgetTypes[3],navbar,node);
		});
		node.addInput("x","tf.Tensor");
		node.addOutput("Value","tf.Tensor");
		node.size = [220,node.size[1]]
	}
}

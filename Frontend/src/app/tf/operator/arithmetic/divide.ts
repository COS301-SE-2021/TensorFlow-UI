import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";
import {Store} from "@ngxs/store";

export class TFDivide extends TFOperator {
	private language:string="tensorflow";
	constructor(public name: string | undefined = undefined,private store: Store) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		if(this.language=="tensorflow") {
			let res = this.genericArithmeticCode(storageLinks, storageNodes, "Divide");
			return `${this.name + "= tf.math.divide(" + res})`;
		}
		else{
			let widgetsData= ["None"];
			let widgetTypes=["rounding_mode"];
			return (this.name+" = torch.div("+
				this.GetNode(storageLinks, storageNodes, this.inputs[0].link,"input","Divide")+","+
				this.GetNode(storageLinks, storageNodes, this.inputs[1].link, "other","Divide")+",*,rounding_mode="+
				(this.widgets.find(element => element.type == widgetTypes[0])?.value || widgetsData[0])+
				",out=None)"
			);
		}
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent, language?: string) {
		if(!language || language==="tensorflow") {
			node.addInput("a", "tf.Tensor");
			node.addInput("b", "tf.Tensor");
			this.createNodeNameWidget(node, navbar);
			node.addOutput("a/b", "tf.Tensor");
		}
		else{
			this.language = language;
			node.addInput("input", "tf.Tensor");
			node.addInput("other", "tf.Tensor");
			node.addOutput("input/other", "tf.Tensor");

			let widgetsData= ["None"];
			let widgetTypes=["rounding_mode"];

			for(let i=0; i<1;++i){
				let widget = this.widgets.find(element => element.type === widgetTypes[i]);
				if(widget!=null)
					widgetsData[i] = widget.value;
			}
			node.addWidget("combo",widgetTypes[0],widgetsData[0],(value) => {
				this.changeWidgetValue(value,widgetTypes[0],navbar);
			},{values: ["None",'"trunc"','"floor"']});

			this.createNodeNameWidget(node, navbar);
			node.size = [220,node.size[1]]
		}
	}
}

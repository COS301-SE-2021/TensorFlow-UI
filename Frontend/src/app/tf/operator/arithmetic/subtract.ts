import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFSubtract extends TFOperator {
	private language:string="tensorflow";
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		if(this.language=="tensorflow") {
			let res = this.genericArithmeticCode(storageLinks, storageNodes, "Subtract");
			return `${this.name + "= tf.math.subtract(" + res})`;
		}
		else{
			let widgetsData= ["1"];
			let widgetTypes=["alpha"];

			return (this.name+" = torch.sub("+
				this.GetNode(storageLinks, storageNodes, this.inputs[0].link,"input","Add")+","+
				this.GetNode(storageLinks, storageNodes, this.inputs[1].link, "other","Add")+",*,"+
				"alpha="+(this.widgets.find(element => element.type == widgetTypes[0])?.value || widgetsData[0])+",out=None)"
			);
		}
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent, language?: string) {

		if(!language || language==="tensorflow") {
			node.addInput("a", "tf.Tensor");
			node.addInput("b", "tf.Tensor");
			this.createNodeNameWidget(node, navbar);
			node.addOutput("a-b", "tf.Tensor");
		}
		else{
			this.language = language;
			node.addInput("input", "tf.Tensor");
			node.addInput("other", "tf.Tensor");
			node.addOutput("input-alpha×other", "tf.Tensor");

			let widgetsData= ["1"];
			let widgetTypes=["alpha"];

			for(let i=0; i<1;++i){
				let widget = this.widgets.find(element => element.type === widgetTypes[i]);
				if(widget!=null)
					widgetsData[i] = widget.value;
			}

			node.addWidget("text",widgetTypes[0],widgetsData[0],(value) => {
				if(this.checkIfNumber(value))
					this.changeWidgetValue(value,widgetTypes[0],navbar);
				else{
					alert("The alpha widget has to be a numeric value");
					this.resetWidgetValueToLast(widgetTypes[0],node,widgetsData[0])
				}
			});
			this.createNodeNameWidget(node, navbar);
		}
	}
}

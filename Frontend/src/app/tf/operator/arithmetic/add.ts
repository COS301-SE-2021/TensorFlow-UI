import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFAdd extends TFOperator{
	private language:string="tensorflow";
	constructor(public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {

		if(this.language=="tensorflow") {
			let res = this.genericArithmeticCode(storageLinks, storageNodes, "Add");
			if (res == "") {

				return;
			}

			return `${this.name + "= tf.math.add(" +
			res
			})`;
		}
		else {
			return `${this.name + "= torch.add("
			}`
		}
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent, language?: string) {
		if(!language || language==="tensorflow") {
			node.addInput("a", "tf.Tensor");
			node.addInput("b", "tf.Tensor");
			this.createNodeNameWidget(node, navbar);
			node.addOutput("a+b", "tf.Tensor");
		}
		else{
			this.language = language;
			node.addInput("input", "tf.Tensor");

			let widgetsData= ["0","0"];
			let widgetTypes=["value","alpha"];

			for(let i=0; i<2;++i){
				let widget = this.widgets.find(element => element.type === widgetTypes[i]);
				if(widget!=null)
					widgetsData[i] = widget.value;
			}

			node.addWidget("text",widgetTypes[0],widgetsData[0],(value) => {
				if(this.checkIfNumber(value))
					this.changeWidgetValue(value,widgetTypes[0],navbar);
				else{
					this.resetWidgetValueToLast(widgetTypes[0],node,widgetsData[0])
				}
			});
			node.addWidget("text",widgetTypes[1],widgetsData[1],(value) => {
				if(this.checkIfNumber(value))
					this.changeWidgetValue(value,widgetTypes[1],navbar);
				else{
					this.resetWidgetValueToLast(widgetTypes[1],node,widgetsData[1])
				}
			});

		}
	}
}

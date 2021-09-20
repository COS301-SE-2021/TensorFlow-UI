import {TFOperator} from "../operator";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFPrelu extends TFOperator{
	constructor(
		public name: string | undefined = undefined) {
		super(name);
	}

	code(storageLinks,storageNodes) {
		return `${this.name + "= tf.math.negative("+
		this.GetNode(storageLinks, storageNodes, this.inputs[0].link)})`;
	}

	UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
		const that = this;
		node.addInput("x", "tf.Tensor"); //should be tf.Tensor|TypedArray|Array

		let widgetsData= ["0.2"];
		let widgetTypes=["alpha"];

		for(let i=0; i<1;++i){
			let widget = this.widgets.find(element => element.type === widgetTypes[i]);
			if(widget!=null)
				widgetsData[i] = widget.value;
		}

		node.addWidget("text","alpha",widgetsData[0],function (value){
			if(that.checkIfNumber(value))
				that.changeWidgetValue(value,widgetTypes[0],navbar);
			else{
				alert("The scaling factor has to be a number");
			}
		});
		this.createNodeNameWidget(node,navbar);
		node.addOutput("x<0 ? alpha*x : f(x)=x", "tf.Tensor");
	}
}

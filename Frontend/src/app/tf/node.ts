import * as litegraph from "litegraph.js";
import {LGraphNode, Vector2} from "litegraph.js";
import {lineConnectors} from "../node-data";
import {Store} from "@ngxs/store";
import {NavbarComponent} from "../Components/navbar/navbar.component";

export class TFNode {
	public inputs: litegraph.INodeInputSlot[] = [];
	public outputs: litegraph.INodeOutputSlot[] = [];
	public widgets: widgetStructure[] = [];
	public selector: string;
	public TFChildInputs: TFNode[] | undefined = undefined;
	public id:number;
	public position: Vector2 = [0,0];

	//Add Data about the

	constructor(public name: string | undefined = undefined,
				public type: string | undefined = undefined,
        public data: number | undefined = undefined) {}
	code(links: lineConnectors[],nodes: TFNode[]) {}

	UIStructure(node: LGraphNode, navbar?:NavbarComponent){}

	changeWidgetValue(value,type,navbar?:NavbarComponent){
		this.pushToArray(this.widgets, {type: type, value: value});
		navbar?.updateNodeWidgetsDataInStore(this);
	}

	pushToArray(array: widgetStructure[], widget: widgetStructure) {
		const index = array.findIndex((element) => element.type === widget.type);

		if(index === -1) {
			array.push(widget);
		}else{
			array[index] = widget;
		}
	}

}

export interface widgetStructure{
	type: string;
	value: string;
}
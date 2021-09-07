import * as litegraph from "litegraph.js";
import {LGraphNode, Vector2} from "litegraph.js";
import {lineConnectors} from "../node-data";

export class TFNode {
	public childOne: TFNode | undefined = undefined;
	public childTwo: TFNode | undefined = undefined;
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

	UIStructure(node: LGraphNode){}

	pushToArray(array: widgetStructure[], widget: widgetStructure) {
		const index = array.findIndex((element) => element.type === widget.type);

		if(index === -1) {
			array.push(widget);
		}else{
			array[index] = widget;
		}
	}

	changeWidgetValue(value,type){
		this.pushToArray(this.widgets, {type: type, value: value});
	}
}

export interface widgetStructure{
	type: string;
	value: string;
}
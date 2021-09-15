import * as litegraph from "litegraph.js";
import {LGraphNode, Vector2} from "litegraph.js";
import {lineConnectors} from "../node-data";
import {Store} from "@ngxs/store";
import {NavbarComponent} from "../Components/navbar/navbar.component";
import {userVariableNames} from "./userVariableNames";

export class TFNode {
	public inputs: litegraph.INodeInputSlot[] = [];
	public outputs: litegraph.INodeOutputSlot[] = [];
	public widgets: widgetStructure[] = [];
	public selector: string;
	public TFChildInputs: TFNode[] | undefined = undefined;
	public id:number;
	public position: Vector2 = [0,0];
	public returnValue: string = "";

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

	GetNode(storageLinks: lineConnectors[], storageNodes: TFNode[], input: number | null): string {

		if (input == undefined) {
			alert("Input node required");
			return "";
		}
		const link = storageLinks.find(element => element.id == input);
		const inputNode = storageNodes.find(element => element.id == link?.origin_id);

		return inputNode?.name || "0";
	}

	checkIfNumber(input: string): boolean{
		return !isNaN(Number(input));
	}

	setNodeCustomName(){
		let name = this.widgets.find(element => element.type == "name")?.value;
		if(name){
			if(userVariableNames.find(element =>element === name))
				alert("Name already exists in code, a custom unique name will instead be given to the operation");
			else {
				userVariableNames.push(name);
				this.name = name;
			}
		}
	}

}

export interface widgetStructure{
	type: string;
	value: string;
}

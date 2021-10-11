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
	public visitCount:number=0;

	//Add Data about the

	constructor(public name: string | undefined = undefined,
				public type: string | undefined = undefined,
        public data: number | number[] | undefined = undefined) {}
	code(links: lineConnectors[],nodes: TFNode[]) {}

	UIStructure(node: LGraphNode, navbar?:NavbarComponent, language?:string){}

	changeWidgetValue(value,type,navbar?:NavbarComponent,node?:LGraphNode){
		if(type==="name" && node){
			if(!this.setNodeCustomName(value,navbar)){
				this.resetWidgetValueToLast(type,node,this.name);
				return;
			}
		}
		this.pushToArray(this.widgets, {type: type, value: value});
		navbar?.updateNodeWidgetsDataInStore(this);
	}

	resetWidgetValueToLast(type,node,defaultValue){
		let lGraphNodeWidget = node.widgets.find(element => element.name == type);
		let tfNodeWidget = this.widgets.find(element => element.type == type);
		if(tfNodeWidget)
			lGraphNodeWidget.value = tfNodeWidget.value;
		else
			lGraphNodeWidget.value = defaultValue;
	}

	checkIfWidgetTypeIsAVectorArray(value:string, type:string):boolean{
		value.trim();

		if(value.length>1){
			if(value.charAt(0)!=='[' || value.charAt(value.length-1)!==']'){
				if(type==="perm?"|| type==="perm")
					alert("The permutation of the dimensions of x, has to be a vector array of type number[]");
				else if(type=="shape?" || type=="shape")
					alert("The shape variable has to be a vector array of type number[]");
				return false;
			}
			else{
				value = value.substring(1,value.length-1);
				let newVal = value.split(',');
				for(let elem of newVal){
					if(isNaN(Number(elem)) || elem===""){
						if(type==="perm?"|| type==="perm")
							alert("The permutation of the dimensions of x, has to be a vector array of type number[]")
						else if(type=="shape?" || type=="shape")
							alert("The shape variable has to be a vector array of type number[]");
						return false;
					}
				}
			}
		}
		else{
			if(type==="perm?"|| type==="perm")
				alert("The permutation of the dimensions of x, has to be a vector array of type number[]")
			else if(type=="shape?" || type=="shape")
				alert("The shape variable has to be a vector array of type number[]");
			return false;
		}
		return true;
	}

	pushToArray(array: widgetStructure[], widget: widgetStructure) {
		const index = array.findIndex((element) => element.type === widget.type);

		if(index === -1) {
			array.push(widget);
		}else{
			array[index] = widget;
		}
	}

	GetNode(storageLinks: lineConnectors[], storageNodes: TFNode[], input: number | null, inputName?,nodeName?): string {

		if (input == undefined) {
			if(!inputName)
				alert("Input node required");
			else{
				alert("Input node '"+inputName+"' for the "+nodeName+" function required");
			}
			return "undefined";
		}
		const link = storageLinks.find(element => element.id == input);
		const inputNode = storageNodes.find(element => element.id == link?.origin_id);

		return inputNode?.name || "0";
	}

	checkIfNumber(input: string): boolean{
		return !isNaN(Number(input));
	}

	setNodeCustomName(name:string,navbar?:NavbarComponent):boolean{
		let nameWidget = this.widgets.find(element => element.type == "name");

		let oldNameInArrayIndex = userVariableNames.findIndex(element => element === this.name);
		if(oldNameInArrayIndex>-1){
			userVariableNames.splice(oldNameInArrayIndex,1);
		}

		if(userVariableNames.find(element =>element === name)){
			alert("A node with the same name already exists in the canvas. Either a custom unique name will instead be given to the operation, or the last valid name given will be used");
			return false;
		}
		else{


			userVariableNames.push(name);
			this.name = name;
		}
		navbar?.updateNodeNameInStore(this);
		return true;
	}

	createNodeNameWidget(node: LGraphNode,navbar?:NavbarComponent){
		let widgetsData= [this.name];
		let widgetTypes=["name"];

		node.addWidget("text",widgetTypes[0],widgetsData[0],(value) => {
			this.changeWidgetValue(value,widgetTypes[0],navbar,node);
		});
	}
}

export interface widgetStructure{
	type: string;
	value: string;
}

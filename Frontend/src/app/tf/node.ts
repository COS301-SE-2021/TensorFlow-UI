import * as litegraph from "litegraph.js";
import {LGraphNode, Vector2} from "litegraph.js";

export class TFNode {
	public childOne: TFNode | undefined = undefined;
	public childTwo: TFNode | undefined = undefined;
	public inputs: litegraph.INodeInputSlot[];
	public outputs: litegraph.INodeOutputSlot[];
	public widgets: litegraph.widgetTypes[];
	public selector: string;
	public id:number;
	public position: Vector2 = [0,0];

	//Add Data about the

	constructor(public name: string | undefined = undefined,
				public type: string | undefined = undefined,
        public data: number | undefined = undefined) {}
	code() {}
}

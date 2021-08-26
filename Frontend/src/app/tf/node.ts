import * as litegraph from "litegraph.js";
import {LGraphNode} from "litegraph.js";

export class TFNode {
	public childOne: TFNode | undefined = undefined;
	public childTwo: TFNode | undefined = undefined;
	public selector: string | undefined = undefined;
	public id:number;
	public positionX: number = 0;
	public positionY: number = 0;

	//Add Data about the

	constructor(public name: string | undefined = undefined,
				public type: string | undefined = undefined,
        public data: number | undefined = undefined) {}
	code() {}
}

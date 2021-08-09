import * as LeaderLine from "leader-line-new";

export interface lineConnectors {
	start: string;
	end: string;
	line: LeaderLine|null;
}

export interface NodeData {
	num: number
	name: string
	type: string
	x: number
	y: number
}

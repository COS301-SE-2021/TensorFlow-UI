export interface lineConnectors {
	id:number;
	origin_id: number;
	origin_slot: number;
	target_id: number;
	target_slot: number;
	type: string;
}

export interface NodeData {
	num: number
	name: string
	type: string
  	value: string
	x: number
	y: number
}

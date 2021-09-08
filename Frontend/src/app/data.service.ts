import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {lineConnectors, NodeData} from "./node-data";
import {TFNode, TFOperator} from "./tf";
import { TFTensor} from "./tf/tensor/tensor";

@Injectable({
	providedIn: 'root'
})
export class DataService {
	get TFNodes(): TFNode[] {
		return this._TFNodes;
	}

	set TFNodes(value: TFNode[]) {
		this._TFNodes = value;
	}
	get TFTensors(): TFTensor[] {
		return this._TFTensors;
	}

	set TFTensors(value: TFTensor[]) {
		this._TFTensors = value;
	}
	get TFOperator(): TFOperator[] {
		return this._TFOperator;
	}

	set TFOperator(value: TFOperator[]) {
		this._TFOperator = value;
	}
	get lineConnectorsList(): lineConnectors[] {
		return this._lineConnectorsList;
	}

	set lineConnectorsList(value: lineConnectors[]) {
		this._lineConnectorsList = value;
	}

	get nodes(): NodeData[] {
		return this._nodes;
	}

	set nodes(value: NodeData[]) {
		this._nodes = value;
	}

	get type(): string {
		return this._type;
	}

	get name(): string {
		return this._name;
	}

	set currentNode(node: NodeData) {
		this._currentNode = node;
	}

	get currentNode(): NodeData {
		return this._currentNode;
	}

	private _name = "";
	private _type = "";

	private _nodes: NodeData[];
	private _currentNode: NodeData;
	private _lineConnectorsList: lineConnectors[];
	private _TFOperator: TFOperator[];
	private _TFTensors: TFTensor[];
	private _TFNodes: TFNode[];

	private createNodeSource = new BehaviorSubject(false); //default = false

	createNodeBoolean = this.createNodeSource.asObservable();

	constructor() {
	}


	passFormDataToNode(nodeName: string, nodeDataType: string, nodeResult: string) {
		this._name = nodeName;
		this._type = nodeDataType;
	}
}

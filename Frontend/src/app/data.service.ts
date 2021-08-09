import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {lineConnectors, NodeData} from "./node-data";


@Injectable({
	providedIn: 'root'
})
export class DataService {
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
	private _nodeCreationBoolean: boolean;
	private _lineConnectorsList: lineConnectors[];


	private createNodeSource = new BehaviorSubject(false); //default = false

	createNodeBoolean = this.createNodeSource.asObservable();

	constructor() {
	}


	passFormDataToNode(nodeName: string, nodeDataType: string, nodeResult: string) {
		this._name = nodeName;
		this._type = nodeDataType;
	}
}

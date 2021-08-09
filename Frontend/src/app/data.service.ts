import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NodeData} from "./node-data";
import {lineConnectors, NodeData} from "./node-data";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  get nodes(): NodeData[] {
    return this._nodes;
	get lineConnectorsList(): lineConnectors[] {
		return this._lineConnectorsList;
	}

  set nodes(value: NodeData[]) {
    this._nodes = value;
  }
  get type(): string {
    return this._type;
  }
	set lineConnectorsList(value: lineConnectors[]) {
		this._lineConnectorsList = value;
	}

  get name(): string {
    return this._name;
  }

  set currentNode(node: NodeData){
    this._currentNode = node;
  }

  get currentNode(): NodeData{
    return this._currentNode;
  }

  set nodeCreationBoolean(create: boolean) {
    this._nodeCreationBoolean = create;
  }

  private _name = "";
  private _type = "";
  private _x:number=0; //change to private
  private _y:number=0; //change to private

  private _nodes: NodeData[];
  private _currentNode: NodeData;
  private _nodeCreationBoolean: boolean;

  private tempNode: NodeData[] = [];

  private createNodeSource = new BehaviorSubject(false); //default = false
  private createFormSource = new BehaviorSubject(false); //default = false
	private _lineConnectorsList: lineConnectors[];

  createNodeBoolean = this.createNodeSource.asObservable();
  createFormBoolean = this.createFormSource.asObservable();

  constructor() {
  }

  changeCreateNodeBoolean(createNodeSection: boolean) {
    this.createNodeSource.next(createNodeSection)
  }

  changeCreateFormBoolean(createFormSection: boolean) {
    this.createFormSource.next(createFormSection)
  }

  passFormDataToNode(nodeName: string, nodeDataType: string, nodeResult: string){
    this._name = nodeName;
    this._type = nodeDataType;
  }

  applyZoomableBehaviour() {}
  applyDraggableBehaviour() {}
  getForceDirectedGraph() {}
}

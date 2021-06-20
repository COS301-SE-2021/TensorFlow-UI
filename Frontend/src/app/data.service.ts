import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NodeData} from "./node-data";


@Injectable({
  providedIn: 'root'
})
export class DataService {
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

  set currentNode(node: NodeData){
    this._currentNode = node;
  }

  get currentNode(): NodeData{
    return this._currentNode;
  }

  private _name = "";
  private _type = "";

  private _nodes: NodeData[];
  private _currentNode: NodeData;

  private tempNode: NodeData[] = [];


  private createNodeSource = new BehaviorSubject(false); //default = false
  private createFormSource = new BehaviorSubject(false); //default = false
  private showNodeEditSource = new BehaviorSubject(false);
  private currentNodeSource = new BehaviorSubject(this.tempNode[0]);

  createNodeBoolean = this.createNodeSource.asObservable();
  createFormBoolean = this.createFormSource.asObservable();
  showNodeEditBoolean = this.showNodeEditSource.asObservable();
  currentNodeValue = this.currentNodeSource.asObservable();

  constructor() {
  }

  changeCreateNodeBoolean(createNodeSection: boolean) {
    this.createNodeSource.next(createNodeSection)
  }

  changeCreateFormBoolean(createFormSection: boolean) {
    this.createFormSource.next(createFormSection)
  }

  changeEditNodeView(editNodeSection: boolean){
    this.showNodeEditSource.next(editNodeSection);
  }

  changeCurrentNode(currentNode: NodeData){
    this.currentNodeSource.next(currentNode);
  }

  passFormDataToNode(nodeName: string, nodeDataType: string, nodeResult: string){
    this._name = nodeName;
    this._type = nodeDataType;
  }

}

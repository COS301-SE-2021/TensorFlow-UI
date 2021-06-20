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

  private _name = "";
  private _type = "";

  private _nodes: NodeData[];
  private createNodeSource = new BehaviorSubject(false); //default = false
  private createFormSource = new BehaviorSubject(false); //default = false
  //private addNodeSource = new BehaviorSubject(new ());

  // private newNodeNameSource = new BehaviorSubject(this._nodes);

  createNodeBoolean = this.createNodeSource.asObservable();
  createFormBoolean = this.createFormSource.asObservable();
  //addNodeFunction = this.addNodeSource.asObservable();

  // nodeName = this.newNodeNameSource.asObservable();
  //nodeDataType = this.newNodeDTypeSource.asObservable();
  //nodeResult = this.newNodeResultSource.asObservable();

  constructor() {
  }

  changeCreateNodeBoolean(createNodeSection: boolean) {
    this.createNodeSource.next(createNodeSection)
  }

  changeCreateFormBoolean(createFormSection: boolean) {
    this.createFormSource.next(createFormSection)
  }

  // passFormDataToNode(passedNodeData: Node){
  //   this.newNodeDataSource.next(new Node());
  // }

  passFormDataToNode(nodeName: string, nodeDataType: string, nodeResult: string){
    this._name = nodeName;
    this._type = nodeDataType;
    //this.newNodeNameSource.next(nodeName);
    //this.newNodeDTypeSource.next(nodeDataType);
    //this.newNodeResultSource.next(nodeResult);
  }

}

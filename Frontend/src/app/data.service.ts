import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {NodeData} from "./node-data";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  nodeData: NodeData[] = [];
  private createNodeSource = new BehaviorSubject(false); //default = false
  private createFormSource = new BehaviorSubject(false); //default = false
  //private addNodeSource = new BehaviorSubject(new ());

  private newNodeNameSource = new BehaviorSubject(this.nodeData);

  createNodeBoolean = this.createNodeSource.asObservable();
  createFormBoolean = this.createFormSource.asObservable();
  //addNodeFunction = this.addNodeSource.asObservable();

  nodeName = this.newNodeNameSource.asObservable();
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

  passFormDataToNode(nodeName: String, nodeDataType: String, nodeResult: String){
    //this.newNodeNameSource.next(nodeName);
    //this.newNodeDTypeSource.next(nodeDataType);
    //this.newNodeResultSource.next(nodeResult);
  }

}

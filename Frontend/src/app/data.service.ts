import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private createNodeSource = new BehaviorSubject(false); //default = false
  private newNodeNameSource = new BehaviorSubject(new String());
  private newNodeDTypeSource = new BehaviorSubject(new String());
  private newNodeResultSource= new BehaviorSubject(new String());

  currentBoolean = this.createNodeSource.asObservable();

  nodeName = this.newNodeNameSource.asObservable();
  nodeDataType = this.newNodeDTypeSource.asObservable();
  nodeResult = this.newNodeResultSource.asObservable();

  constructor() { }

  changeCreateNodeBoolean(createNodeSection: boolean) {
    this.createNodeSource.next(createNodeSection)
  }

  // passFormDataToNode(passedNodeData: Node){
  //   this.newNodeDataSource.next(new Node());
  // }

  passFormDataToNode(nodeName: String, nodeDataType: String, nodeResult: String){
    this.newNodeNameSource.next(nodeName);
    this.newNodeDTypeSource.next(nodeDataType);
    this.newNodeResultSource.next(nodeResult);
  }

}

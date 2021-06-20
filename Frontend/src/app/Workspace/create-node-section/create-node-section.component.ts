import {Component, OnInit } from '@angular/core';
import {Node} from "../../Node/node";
import {FormControl } from '@angular/forms';
import {DataService} from "../../data.service";

@Component({
  selector: 'app-create-node-section',
  templateUrl: './create-node-section.component.html',
  styleUrls: ['./create-node-section.component.css']
})
export class CreateNodeSectionComponent implements OnInit { //HeroFormComponent

  formNodeData: Node;
  createNodeBool: boolean;

  nodeResult: String;
  nodeName = new FormControl('');
  nodeType = new FormControl('');

  nodeN = this.nodeName.value;
  nodeT = this.nodeType.value;

  constructor(private data : DataService) {
    this.data.createNodeBoolean.subscribe(nodeBool => this.createNodeBool = nodeBool);

    // this.data.nodeName.subscribe(nodeName => this.nodeN = nodeName);
    //this.data.nodeDataType.subscribe(nodeType => this.nodeT = nodeType);
    //this.data.nodeResult.subscribe(nodeResult => this.nodeResult = nodeResult);
  }

  submitted = false;

  ngOnInit(): void {
  }

  onClickSubmit(data:any) {
    this.submitted = true;
      if(this.nodeName.value != "" && this.nodeType.value != ""){
        //this.nodeCreated = true;
        this.data.changeCreateNodeBoolean(true);
        this.data.passFormDataToNode(this.nodeName.value,this.nodeType.value,"void");
      }
  }
}

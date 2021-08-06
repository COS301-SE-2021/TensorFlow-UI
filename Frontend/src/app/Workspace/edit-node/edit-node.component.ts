import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NodeData} from "../../node-data";
import {DataService} from "../../data.service";
import {MatSidenav} from "@angular/material/sidenav";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.css']
})
export class EditNodeComponent implements OnInit {

  @Input() nodeData: NodeData

  currentNode: NodeData;
  editNodeBool: boolean;
  outputNode: any;

  nodeName = new FormControl('');
  nodeType = new FormControl('');

  nodeTypes: String[] = ["Array","Boolean","Integer","String","Void"];

  constructor(public data: DataService) {

  }

  test(){
    console.log(this.currentNode);
    //console.log(this.data.currentNode.name);
  }

  ngOnInit(): void {
    this.data.createNodeBoolean.subscribe(editBool => this.editNodeBool = editBool);
    this.data.currentNodeValue.subscribe(currentNode => this.currentNode = currentNode);
  }

  onClickSubmit(data:any) {
    if(this.nodeName.value != ""){
      this.data.currentNode.name = this.nodeName.value;
    }

    if( this.nodeType.value != ""){
      this.data.currentNode.type = this.nodeType.value;
    }
  }

}

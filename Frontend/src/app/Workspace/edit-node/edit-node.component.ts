import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NodeData} from "../../node-data";
import {DataService} from "../../data.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.css']
})
export class EditNodeComponent implements OnInit {

  @Input() nodeData: NodeData

  currentNode: NodeData;
  editNodeBool: boolean;

  constructor(private data: DataService) {
    this.currentNode = this.data.currentNode;
    console.log(this.editNodeBool);
  }

  ngOnInit(): void {
    this.data.createNodeBoolean.subscribe(editBool => this.editNodeBool = editBool);

  }

}
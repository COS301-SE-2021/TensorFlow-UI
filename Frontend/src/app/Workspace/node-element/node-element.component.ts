import {Component, Input, OnInit} from '@angular/core';
import {Node} from "../../Node/node";
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";

@Component({
  selector: 'app-node-element',
  templateUrl: './node-element.component.html',
  styleUrls: ['./node-element.component.css']
})
export class NodeElementComponent implements OnInit {

  @Input() nodeData: NodeData
  editNodeSection=false;

  constructor(private data: DataService) { }

  showEditSection(event,data: NodeData){
    this.data.changeEditNodeView(!this.editNodeSection);
    this.data.currentNode = data; //how to fix this
    //this.data.changeCurrentNode(data);
  }

  ngOnInit(): void {
    this.data.showNodeEditBoolean.subscribe(editBool => this.editNodeSection = editBool);
    this.data.currentNode;
  }
}

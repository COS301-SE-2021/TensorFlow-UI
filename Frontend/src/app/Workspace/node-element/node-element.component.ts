import { Component, OnInit } from '@angular/core';
import {Node} from "../../Node/node";
import {DataService} from "../../data.service";

@Component({
  selector: 'app-node-element',
  templateUrl: './node-element.component.html',
  styleUrls: ['./node-element.component.css']
})
export class NodeElementComponent implements OnInit {

  nodeName:String;
  nodeType:String;
  result:String;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.nodeName.subscribe(nodeName => this.nodeName = nodeName);
    this.data.nodeDataType.subscribe(nodeType => this.nodeType = nodeType);
    this.data.nodeResult.subscribe(nodeResult => this.result = nodeResult);
  }
}

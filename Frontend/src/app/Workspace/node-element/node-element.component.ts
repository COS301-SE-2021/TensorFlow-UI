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

  constructor(private data: DataService) { }

  ngOnInit(): void {

  }
}

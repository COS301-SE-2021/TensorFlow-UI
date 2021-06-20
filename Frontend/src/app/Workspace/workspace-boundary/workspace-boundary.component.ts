import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";

@Component({
  selector: 'app-workspace-boundary',
  templateUrl: './workspace-boundary.component.html',
  styleUrls: ['./workspace-boundary.component.css']
})
export class WorkspaceBoundaryComponent implements OnInit {

  nodes: NodeData[];
  createNodeBool: boolean;
  showNodeCreateSection = false;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentBoolean.subscribe(nodeBool => this.createNodeBool = nodeBool);
    this.nodes = [];
  }

  addNode() {
    this.createNodeBool = false;
    this.nodes.push({
      num: this.nodes.length + 1,
      name: "0000",
      type: ""
    });
  }

}

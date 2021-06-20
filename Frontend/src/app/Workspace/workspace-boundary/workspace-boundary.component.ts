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
  createFormBool = false;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.createNodeBoolean.subscribe(nodeBool => this.createNodeBool = nodeBool);
    this.data.createFormBoolean.subscribe(formBool => this.createFormBool = formBool);
    this.nodes = [];
  }

  addNode() {
    //this.createNodeBool = false;
    this.data.changeCreateFormBoolean(false);
    this.data.changeCreateNodeBoolean(false);
    this.nodes.push({
      num: this.nodes.length + 1,
      name: "0000",
      type: ""
    });
  }

}

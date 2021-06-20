import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";

@Component({
  selector: 'app-workspace-boundary',
  templateUrl: './workspace-boundary.component.html',
  styleUrls: ['./workspace-boundary.component.css']
})
export class WorkspaceBoundaryComponent implements OnInit {

  createNodeBool: boolean;
  createFormBool = false;
  editNodeBool: boolean;

  constructor(public data: DataService) { }

  ngOnInit(): void {
    this.data.createNodeBoolean.subscribe(nodeBool => this.createNodeBool = nodeBool);
    this.data.createFormBoolean.subscribe(formBool => this.createFormBool = formBool);
    this.data.showNodeEditBoolean.subscribe(editBool => this.editNodeBool = editBool);
    this.data.nodes = [];
  }

  addNode() {
    this.data.changeCreateFormBoolean(false);
    this.data.changeCreateNodeBoolean(false);
    this.data.nodes.push({
      num: this.data.nodes.length + 1,
      name: this.data.name,
      type: this.data.type
    });
  }

}

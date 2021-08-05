import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";
import interact from 'interactjs';

@Component({
  selector: 'app-workspace-boundary',
  templateUrl: './workspace-boundary.component.html',
  styleUrls: ['./workspace-boundary.component.css']
})
export class WorkspaceBoundaryComponent implements OnInit, AfterContentInit {

  createNodeBool: boolean;
  reloadWorkspace: boolean;

  constructor(public data: DataService) { }

  ngAfterContentInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.data.createNodeBoolean.subscribe(nodeBool => this.createNodeBool = nodeBool);
    this.data.nodes = [];
    // this.initWorkspace();
  }

  addNodeToWorkspace() {
    this.data.changeCreateNodeBoolean(false);
    this.reloadWorkspace=true;

    const nodeName = "Component" + (Number(this.data.nodes.length)+1);
    this.data.nodes.push({
      num: this.data.nodes.length + 1,
      name: nodeName,
      type: this.data.type,
      x: 0,
      y: 0
    });
  }

}

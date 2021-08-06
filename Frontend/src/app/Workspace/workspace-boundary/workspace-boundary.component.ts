import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";
import interact from 'interactjs';
import * as d3 from 'd3';

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

    d3.select("#canvas")
      .append("svg")
      .attr("id","mainSvg")
      .attr("width", "99%")
      .attr("height", "100rem ")
      .style("border","2px solid black")
      .style("position", "absolute")
  }

  addNodeToWorkspace() {
    this.data.changeCreateNodeBoolean(false);
    this.reloadWorkspace=true;

    const nodeName = "Component" + (Number(this.data.nodes.length)+1);
    this.data.nodes.push({
      num: this.data.nodes.length + 1,
      name: nodeName,
      type: this.data.type,
      connectors: [],
      x: 0,
      y: 0
    });

  }
}

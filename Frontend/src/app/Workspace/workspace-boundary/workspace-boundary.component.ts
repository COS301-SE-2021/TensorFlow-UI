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
export class WorkspaceBoundaryComponent implements OnInit {

  createNodeBool: boolean;
  reloadWorkspace: boolean;
  @Input() loadWorkspace: boolean;
  globalLoadWorkspace: boolean =true;

  constructor(public data: DataService) {
    this.data.createNodeBoolean.subscribe(nodeBool =>this.createNodeBool = nodeBool)
  }

  ngOnInit(): void {

    if(this.createNodeBool){
      console.log("YEss")
      this.addNodeToWorkspace();
    }

    this.data.nodes = [];

    d3.select("#canvas")
      .append("svg")
      .attr("id","mainSvg")
      .attr("width", "99%")
      .attr("height", "100rem ")
      .style("border","2px solid black")
      .style("position", "absolute")
  }

}

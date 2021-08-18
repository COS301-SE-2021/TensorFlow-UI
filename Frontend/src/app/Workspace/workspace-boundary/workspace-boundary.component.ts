import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";
import {TFGraph, TFNode} from "../../tf";
import {Store} from "@ngxs/store";
import projectList from "../import/import.component";

@Component({
	selector: 'app-workspace-boundary',
	templateUrl: './workspace-boundary.component.html',
	styleUrls: ['./workspace-boundary.component.css']
})
export class WorkspaceBoundaryComponent implements OnInit {
  public projectL = projectList
	@Input() TFNodes: TFNode[];

	@Input() storageNode: NodeData[];
	@Input() storageLines: NodeData[];
	root: TFGraph = new TFGraph(new TFNode("rootNode", "root"));

	constructor(public data: DataService, public store: Store) {
	}

	ngOnInit(): void {
		//this.data.nodes = [];
		//this.data.lineConnectorsList = [];

		// this.data.TFOperator = [];
		// this.data.TFTensors = [];
	}
}

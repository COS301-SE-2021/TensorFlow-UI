import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";

@Component({
	selector: 'app-workspace-boundary',
	templateUrl: './workspace-boundary.component.html',
	styleUrls: ['./workspace-boundary.component.css']
})
export class WorkspaceBoundaryComponent implements OnInit {

	@Input() storageNode: NodeData[];
	@Input() storageLines: NodeData[];

	constructor(public data: DataService) {

	}

	ngOnInit(): void {
		this.data.nodes = [];
		this.data.lineConnectorsList = [];

		// Part of the new UI section
		// this.data.TFOperator = [];
		// this.data.TFTensors = [];
	}
}

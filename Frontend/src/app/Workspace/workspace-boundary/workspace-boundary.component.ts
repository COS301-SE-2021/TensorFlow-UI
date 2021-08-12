import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";

@Component({
	selector: 'app-workspace-boundary',
	templateUrl: './workspace-boundary.component.html',
	styleUrls: ['./workspace-boundary.component.css']
})
export class WorkspaceBoundaryComponent implements OnInit {


	constructor(public data: DataService) {
	}

	ngOnInit(): void {
		//this.data.nodes = [];
		//this.data.lineConnectorsList = [];
	}
}

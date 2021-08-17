import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";
import {Store} from "@ngxs/store";
import projectList from "../import/import.component";
import {
  WorkspaceState,
  AddLineConnectorToStorage,
  UpdateNodeInStorage,
  RemoveNodeFromStorage, RemoveLineFromStorage
} from '../../../Storage/workspace'

@Component({
	selector: 'app-workspace-boundary',
	templateUrl: './workspace-boundary.component.html',
	styleUrls: ['./workspace-boundary.component.css']
})
export class WorkspaceBoundaryComponent implements OnInit, AfterContentInit {
  public projectL = projectList;
	@Input() storageNode: NodeData[];
	@Input() storageLines: NodeData[];
	public createWorkspace: boolean = true;

	constructor(public data: DataService,private store: Store) {

  }

	ngOnInit(): void {
		this.data.nodes = [];
		this.data.lineConnectorsList = [];
		// this.data.TFOperator = [];
		// this.data.TFTensors = [];
	}

	ngAfterContentInit() {

  }
}

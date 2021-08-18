import {Component, Inject, Input, OnInit} from '@angular/core';
import {TFNode, TFTensor} from "../../tf";
import {DataService} from "../../data.service";
import * as LeaderLine from "leader-line-new";
import {DOCUMENT} from "@angular/common";
import {WorkspaceState} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";

@Component({
	selector: 'app-tensor',
	templateUrl: './tensor.component.html',
	styleUrls: ['./tensor.component.css']
})
export class TensorComponent implements OnInit {
	get TFNodeData(): TFNode {
		return this._TFNodeData;
	}

	nodes: TFNode[];

	@Input() _TFNodeData : TFNode;

	constructor(public data: DataService, @Inject(DOCUMENT) private document, private store: Store) {
	}

	ngOnInit(): void {
	}

	// Redraw lines for each component.
	reload() {
		this.nodes = this.store.selectSnapshot(WorkspaceState).TFNode;

		if (this.store.select(WorkspaceState) != null && this.store.selectSnapshot(WorkspaceState).lines.length > 0) {
			for (let i = 0; i < this.store.selectSnapshot(WorkspaceState).lines.length; i++) {

				let l: LeaderLine;
				l = this.store.selectSnapshot(WorkspaceState).lines[i]["line"];
				l?.position();
			}
		}
	}

}

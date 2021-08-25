import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";
import {TFGraph, TFNode} from "../../tf";
import {Store} from "@ngxs/store";
import projectList from "../import/import.component";
import {WorkspaceState} from "../../../Storage/workspace";
import * as LeaderLine from "leader-line-new";
import * as litegraph from "litegraph.js";

@Component({
	selector: 'app-workspace-boundary',
	templateUrl: './workspace-boundary.component.html',
	styleUrls: ['./workspace-boundary.component.css']
})
export class WorkspaceBoundaryComponent implements OnInit {

	liteNodes: litegraph.LGraph[];

	graph: litegraph.LGraph;


  public projectL = projectList
	@Input() TFNodes: TFNode[];

	@Input() storageNode: NodeData[];
	@Input() storageLines: NodeData[];
	root: TFGraph = new TFGraph(new TFNode("rootNode", "root"));

	constructor(public data: DataService, public store: Store) {
	}

	ngOnInit(): void {
		this.liteNodes = [];

		this.graph = new litegraph.LGraph();

		let canvas = new litegraph.LGraphCanvas("#mycanvas", this.graph);

		let node_const = litegraph.LiteGraph.createNode("basic/const");
		node_const.pos = [200,200];
		this.graph.add(node_const);
		node_const.setValue(4.5);

		let node_watch = litegraph.LiteGraph.createNode("basic/watch");
		node_watch.pos = [700,200];
		this.graph.add(node_watch);

		node_const.connect(0, node_watch, 0 );

		this.graph.start()
	}

	reload() {
		let nodes = this.store.selectSnapshot(WorkspaceState).TFNode;

		if (this.store.select(WorkspaceState) != null && this.store.selectSnapshot(WorkspaceState).lines.length > 0) {
			for (let i = 0; i < this.store.selectSnapshot(WorkspaceState).lines.length; i++) {

				let l: LeaderLine;
				l = this.store.selectSnapshot(WorkspaceState).lines[i]["line"];
				l?.position();
			}
		}
	}

	createLiteNode()
	{
		let node_const = litegraph.LiteGraph.createNode("basic/const");
		node_const.pos = [200,200];
		this.graph.add(node_const);
		node_const.setValue(3);
		node_const.title = "TestHello";
	}

}

import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {TFNode,} from "../../tf";
import {FormControl} from "@angular/forms";
import {DataService} from "../../data.service";
import * as LeaderLine from "leader-line-new";
import {DOCUMENT} from "@angular/common";
import {
	AddLineConnectorToStorage,
	RemoveLineConnectionOne,
	RemoveLineConnectionTwo,
	UpdateNodeInStorage,
	WorkspaceState
} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";
import interact from "interactjs";

@Component({
	selector: 'app-operator',
	templateUrl: './operator.component.html',
	styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit, AfterViewInit {

	nodes: TFNode[];

	selectedNodeX = new FormControl();
	selectedNodeY = new FormControl();

	@Input() _TFNodeDataOperator: TFNode;

	constructor(public data: DataService, @Inject(DOCUMENT) private document, private store: Store) {
		this.initialiseDraggable();
	}

	ngOnInit(): void {
	}

	ngAfterViewInit() {
		//
		// if (this._TFNodeDataOperator.name != undefined) {
		// 	const node = document.getElementById(this._TFNodeDataOperator.name);
		//
		// 	if (node != null) {
		// 		node.style.transform = 'translate(' + Number(this._TFNodeDataOperator.) + 'px, ' + Number(this._TFNodeDataOperator.y) + 'px)'
		//
		// 		node.setAttribute('data-x', this._TFNodeDataOperator.x.toString());
		// 		node.setAttribute('data-y', this._TFNodeDataOperator.y.toString());
		// 	}
		// }
	}

	// Initial linking between two node elements.
	linkNodes(selectedNode: FormControl) {

		if (this._TFNodeDataOperator?.name != undefined) {
			const lineStartName = this._TFNodeDataOperator.name.toString();
			const lineEndName = selectedNode.toString();
			const lineObj = new LeaderLine(
				this.document.getElementById(lineStartName),
				this.document.getElementById(lineEndName), {
					startSocket: 'auto',
					endSocket: 'auto'
				}
			);

			this.store.dispatch(new AddLineConnectorToStorage({
				start: lineStartName,
				end: lineEndName,
				line: lineObj
			}))
		}
	}

	checkChild(selectedNode: FormControl) {
		if (selectedNode == this.selectedNodeX) {
			if (selectedNode.value.toString() != this._TFNodeDataOperator.childOne?.name) {
				this.store.dispatch(new RemoveLineConnectionOne(this._TFNodeDataOperator))
			}
		}
		if (selectedNode == this.selectedNodeY) {
			if (selectedNode.value.toString() != this._TFNodeDataOperator.childTwo?.name) {
				this.store.dispatch(new RemoveLineConnectionTwo(this._TFNodeDataOperator))
			}
		}
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

	initialiseDraggable() {
		const that = this;
		interact('.draggableNode')
			.draggable({
				inertia: true,
				modifiers: [
					interact.modifiers.restrictRect({
						restriction: '.workspace-boundary',
						endOnly: true
					})
				],
				autoScroll: true,
				listeners: {
					move: this.dragListener,
					end(event) {
						// console.log(event.target);

						const target = event.target;
						const nodeId = event.target.id;
						// const node = that.data.nodes.find(element => element.name == nodeId);
						const node = that.store.selectSnapshot(WorkspaceState).TFNode.find(element => element.name == nodeId);

						if(node!=null){
							//Update node coordinates
							node.x = target.getAttribute('data-x')
							node.y = target.getAttribute('data-y')

							//Update Node coordinates in the storage
							that.store.dispatch(new UpdateNodeInStorage(node));
						}
					}
				}
			});
	}

	dragListener(event) {
		const target = event.target;
		// keep the dragged position in the data-x/data-y attributes
		const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
		const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

		// translate the element
		target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

		// update the position attributes
		target.setAttribute('data-x', x)
		target.setAttribute('data-y', y)

	}


}

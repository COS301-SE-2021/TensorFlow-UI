import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {TFNode,} from "../../tf";
import {FormControl} from "@angular/forms";
import {DataService} from "../../data.service";
import * as LeaderLine from "leader-line-new";
import {DOCUMENT} from "@angular/common";
import {
	AddLineConnectorToStorage,
	RemoveLineConnectionOne,
	RemoveLineConnectionTwo, RemoveLineFromStorage, RemoveTFNode,
	UpdateNodeInStorage, UpdateTFNode,
	WorkspaceState
} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";
import interact from "interactjs";
import {lineConnectors} from "../../node-data";
import {NavbarComponent} from "../../Components/navbar/navbar.component";
import {MatDialog} from "@angular/material/dialog";
import {NodeDeleteDialogComponent} from "../node-delete-dialog/node-delete-dialog.component";

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

	constructor(public nav: NavbarComponent, @Inject(DOCUMENT) private document, private store: Store, private dialog: MatDialog) {
		this.initialiseDraggable();
	}

	ngOnInit(): void {
	}

	ngAfterViewInit() {

		if (this._TFNodeDataOperator) {
			if (this._TFNodeDataOperator.name != undefined) {
				const node = document.getElementById(this._TFNodeDataOperator.name);

				if (node != null) {
					node.style.transform = 'translate(' + Number(this._TFNodeDataOperator.positionX) + 'px, ' + Number(this._TFNodeDataOperator.positionY) + 'px)'

					node.setAttribute('data-x', this._TFNodeDataOperator.positionX.toString());
					node.setAttribute('data-y', this._TFNodeDataOperator.positionY.toString());
				}
			}
		}
	}

	deleteTFNode() {
		const dialog = this.dialog.open(NodeDeleteDialogComponent, {});


		dialog.afterClosed().subscribe(result => {
			const deleteNodeBoolean = dialog.disableClose;

			if (deleteNodeBoolean) {
				this.store.dispatch(new RemoveTFNode(this._TFNodeDataOperator));
				const tempLine: lineConnectors[] = this.store.selectSnapshot(WorkspaceState).lines
				let lineObject: LeaderLine;
				for (let i = 0; i < tempLine.length; i++) {
					if (tempLine[i].start === this._TFNodeDataOperator.name || tempLine[i].end === this._TFNodeDataOperator.name) {
						{
							lineObject = tempLine[i]["line"];
							this.store.dispatch(new RemoveLineFromStorage(tempLine[i]));
							lineObject?.remove();
						}
					}
				}
				this.nav.TFNodeList.splice(this.nav.TFNodeList.indexOf(this._TFNodeDataOperator), 1);
			}
		})
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

			this.checkChild(selectedNode);

			this.store.dispatch(new AddLineConnectorToStorage({
				start: lineStartName,
				end: lineEndName,
				line: lineObj
			}))
		}
	}

	checkChild(selectedNode: FormControl) {
		if (selectedNode == this.selectedNodeX) {
			if (selectedNode.toString() != this._TFNodeDataOperator.childOne?.name) {
				const templine: LeaderLine = this.store.selectSnapshot(WorkspaceState).lines.find(element => element.start == this._TFNodeDataOperator.name && (element.end == this._TFNodeDataOperator?.childOne?.name || element.end != this._TFNodeDataOperator?.childTwo?.name) && element.start != "rootNode");
				this.store.dispatch(new RemoveLineConnectionOne(this._TFNodeDataOperator));
				templine != undefined ? templine["line"].remove() : "";
				this._TFNodeDataOperator.childOne = this.nodes.find(element => element.name == selectedNode.toString());
				this.store.dispatch(new UpdateTFNode(this._TFNodeDataOperator));

			}
		}
		if (selectedNode == this.selectedNodeY) {
			if (selectedNode.toString() != this._TFNodeDataOperator.childTwo?.name) {
				const templine: LeaderLine = this.store.selectSnapshot(WorkspaceState).lines.find(element => element.start == this._TFNodeDataOperator.name && (element.end == this._TFNodeDataOperator?.childTwo?.name || element.end != this._TFNodeDataOperator?.childOne?.name) && element.start != "rootNode");
				this.store.dispatch(new RemoveLineConnectionTwo(this._TFNodeDataOperator))
				templine != undefined ? templine["line"].remove() : "";
				this._TFNodeDataOperator.childTwo = this.nodes.find(element => element.name == selectedNode.toString());
				this.store.dispatch(new UpdateTFNode(this._TFNodeDataOperator));
			}
		}

	}

	// Reloads the list of components
	reload() {
		this.nodes = this.store.selectSnapshot(WorkspaceState).TFNode;
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

						if (node != null) {
							//Update node coordinates
							node.positionX = target.getAttribute('data-x')
							node.positionY = target.getAttribute('data-y')

							//Update Node coordinates in the storage
							that.store.dispatch(new UpdateTFNode(node));
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

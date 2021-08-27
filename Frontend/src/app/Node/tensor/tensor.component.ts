import {Component, Inject, Input, OnInit} from '@angular/core';
import {TFNode, TFTensor} from "../../tf";
import {DataService} from "../../data.service";
import * as LeaderLine from "leader-line-new";
import {DOCUMENT} from "@angular/common";
import {
	AddRootNode,
	RemoveLineFromStorage,
	RemoveTFNode,
	UpdateNodeInStorage,
	WorkspaceState
} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";
import interact from "interactjs";
import {lineConnectors} from "../../node-data";
import {NavbarComponent} from "../../Components/navbar/navbar.component";
import {NodeDeleteDialogComponent} from "../node-delete-dialog/node-delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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

	@Input() _TFNodeData: TFNode;

	constructor(public data: DataService, @Inject(DOCUMENT) private document, private store: Store, public nav: NavbarComponent,
				private dialog: MatDialog) {
	}

	ngOnInit(): void {
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
						console.log(event.target);

						const target = event.target;
						const nodeId = event.target.id;
						const node = that.store.selectSnapshot(WorkspaceState).TFNode.find(element => element.name == nodeId);

						if (node != null) {
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

	/*
	deleteTFNode() {
		const dialog = this.dialog.open(NodeDeleteDialogComponent, {});


		dialog.afterClosed().subscribe(result => {
			const deleteNodeBoolean = dialog.disableClose;

			if (deleteNodeBoolean) {
				this.store.dispatch(new RemoveTFNode(this._TFNodeData));
				const templine: lineConnectors[] = this.store.selectSnapshot(WorkspaceState).lines
				let lineObject: LeaderLine;
				for (let i = 0; i < templine.length; i++) {
					if (templine[i].start === this._TFNodeData.name || templine[i].end === this._TFNodeData.name) {
						{
							lineObject = templine[i]["line"];
							this.store.dispatch(new RemoveLineFromStorage(templine[i]));
							lineObject?.remove();
						}
					}
				}
				this.nav.TFNodeList.splice(this.nav.TFNodeList.indexOf(this._TFNodeData), 1);
			}
		})
	}

	 */
}

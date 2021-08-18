import {Component, Inject, Input, OnInit} from '@angular/core';
import {TFNode, TFOperator, TFTensor} from "../../tf";
import {FormControl} from "@angular/forms";
import {DataService} from "../../data.service";
import * as LeaderLine from "leader-line-new";
import {DOCUMENT} from "@angular/common";
import {RemoveLineConnectionOne, RemoveLineConnectionTwo, UpdateNodeInStorage} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";
import interact from "interactjs";

@Component({
	selector: 'app-operator',
	templateUrl: './operator.component.html',
	styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {

	selectedNodeX = new FormControl();
	selectedNodeY = new FormControl();

	@Input() _TFNodeDataOperator: TFNode;

	constructor(public data: DataService, @Inject(DOCUMENT) private document, private store: Store) {
		this.initialiseDraggable();
	}

	ngOnInit(): void {
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

			this.data.lineConnectorsList.push({
					start: lineStartName,
					end: lineEndName,
					line: lineObj,
				}
			);
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
		if (this.data?.lineConnectorsList != null) {
			if (this.data.lineConnectorsList.length > 0) {
				for (let i = 0; i < this.data.lineConnectorsList.length; i++) {

					const start = this.data.lineConnectorsList[i].start;
					let end = this.data.lineConnectorsList[i].end;

					this.data.lineConnectorsList[i].line?.remove();
					this.data.lineConnectorsList[i].line = new LeaderLine(
						this.document.getElementById(start),
						this.document.getElementById(end), {
							startSocket: 'auto',
							endSocket: 'auto'
						}
					);

				}
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
						console.log(event.target);

						const target = event.target;
						const nodeId = event.target.id;
						const node = that.data.nodes.find(element => element.name == nodeId);

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

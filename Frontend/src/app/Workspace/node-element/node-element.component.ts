import {Component, Inject, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import { NodeData} from "../../node-data";
import interact from "interactjs";
import {FormControl} from '@angular/forms';
import * as LeaderLine from "leader-line-new"
import {DOCUMENT} from "@angular/common";
import {AddLineConnectorToStorage, AddNodeToStorage} from "../../../Storage/workspace/workspace.actions";
import {Store} from "@ngxs/store";

@Component({
	selector: 'app-node-element',
	templateUrl: './node-element.component.html',
	styleUrls: ['./node-element.component.css']
})
export class NodeElementComponent implements OnInit {

	@Input() nodeData: NodeData
	nodesArray = new FormControl();

	constructor(public data: DataService, @Inject(DOCUMENT) private document, private store: Store) {
		this.initialiseDraggable();
	}

	ngOnInit(): void {
	}

	//Initialise the drag functionality for each node-element.
	initialiseDraggable() {
		interact('.draggable')
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
					}
				}
			});
	}

	dragListener(event) {
		var target = event.target
		// keep the dragged position in the data-x/data-y attributes
		var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
		var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

		// translate the element
		target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

		// update the position attributes
		target.setAttribute('data-x', x)
		target.setAttribute('data-y', y)
	}

	// Initial linking between two node elements.
	linkNodes() {

	  const lineStartName = this.nodeData.name;
	  const lineEndName = this.nodesArray.value[this.nodesArray.value.length - 1].name.toString();
	  const lineObj = new LeaderLine(
      this.document.getElementById(this.nodeData.name),
      this.document.getElementById(this.nodesArray.value[this.nodesArray.value.length - 1].name.toString()), {
        size: 6,
        outlineColor: '#red',
        outline: true,
        endPlugOutline: true,
        dash: true,
        path: 'arc',
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
		this.addLineToStorage(this.data.lineConnectorsList[this.data.lineConnectorsList.length-1]);
	}

	// Redraw lines for each component.
	reload() {
		if (this.data?.lineConnectorsList != null) {
			if (this.data.lineConnectorsList.length > 0) {
				for (let i = 0; i < this.data.lineConnectorsList.length; i++) {
					const start = this.data.lineConnectorsList[i].start;
					let end = this.data.lineConnectorsList[i].end;
            // @ts-ignore
          this.data.lineConnectorsList[i].line.remove();
					this.data.lineConnectorsList[i].line = new LeaderLine(
						this.document.getElementById(start),
						this.document.getElementById(end), {
							size: 6,
							outlineColor: '#red',
							outline: true,
							endPlugOutline: true,
							dash: true,
							path: 'arc',
							startSocket: 'auto',
							endSocket: 'auto'
						}
					);

				}
			}
		}
	}

	addLineToStorage(line){
    this.store.dispatch(new AddLineConnectorToStorage(line));
  }

}

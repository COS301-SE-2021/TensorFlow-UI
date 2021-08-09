import {Component, Inject, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import { NodeData} from "../../node-data";
import interact from "interactjs";
import {FormControl} from '@angular/forms';
import * as LeaderLine from "leader-line-new"
import {DOCUMENT} from "@angular/common";

@Component({
	selector: 'app-node-element',
	templateUrl: './node-element.component.html',
	styleUrls: ['./node-element.component.css']
})
export class NodeElementComponent implements OnInit {

	@Input() nodeData: NodeData
	nodesArray = new FormControl();

	constructor(public data: DataService, @Inject(DOCUMENT) private document) {
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

}

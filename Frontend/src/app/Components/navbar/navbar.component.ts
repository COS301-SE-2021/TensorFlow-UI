import {
	Component, OnInit, ViewChild
} from '@angular/core';
import {DataService} from "../../data.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	createNodeBool: boolean;

	constructor(private data: DataService) {
	}

	ngOnInit(): void {
	}

	// This adds a new node to the data service "nodes" array.
	createNode() {
		this.data.nodes.push({
			num: this.data.nodes.length + 1,
			name: "Component" + (Number(this.data.nodes.length) + 1),
			type: this.data.type,
			x: 0,
			y: 0
		});
	}

	@ViewChild('sidenav') sidenav: MatSidenav;
	isExpanded = true;
	showSubmenu: boolean = false;
	isShowing = false;

	mouseenter() {
		if (!this.isExpanded) {
			this.isShowing = true;
		}
	}

	mouseleave() {
		if (!this.isExpanded) {
			this.isShowing = false;
		}
	}
}

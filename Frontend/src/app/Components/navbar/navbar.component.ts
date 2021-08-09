import {
	Component, OnInit, ViewChild
} from '@angular/core';
import {DataService} from "../../data.service";
import {MatSidenav} from "@angular/material/sidenav";
import { Store } from "@ngxs/store";
import { AddNodeToStorage } from "../../../Storage/workspace/workspace.actions";


@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	createNodeBool: boolean;

	constructor(private data: DataService, private store: Store) {
	}

	ngOnInit(): void {
	}

	// This adds a new node to the data service "nodes" array.
	createNode() {
	  const nodeNum = this.data.nodes.length+1;
    const nodeName = "Component" + (Number(this.data.nodes.length) + 1);
    const nodeType = this.data.type;

		this.data.nodes.push({
			num: nodeNum,
			name: nodeName,
			type: nodeType,
			x: 0,
			y: 0
		});
		this.addNodeToStorage(nodeNum,nodeName,nodeType,0,0);
	}

	addNodeToStorage(num,name,type,x,y){
	  this.store.dispatch(new AddNodeToStorage({num,name,type,x,y}))
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

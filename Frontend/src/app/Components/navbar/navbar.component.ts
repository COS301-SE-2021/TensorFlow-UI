import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../data.service";
import {MatSidenav} from "@angular/material/sidenav";
import { Store, Select } from "@ngxs/store";
import { AddNodeToStorage } from "../../../Storage/workspace/workspace.actions";
import { WorkspaceState } from "../../../Storage/workspace/workspace.state";
import { NodeData } from "../../node-data";
import { Observable } from "rxjs";
import {state} from "@angular/animations";
import {variable} from "@angular/compiler/src/output/output_ast";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nodes$: Observable<NodeData[]>;
  public functionsList: string[] = ["add","subtract","multiply","divide"];

	constructor(private data: DataService, private store: Store) {
	  this.nodes$ = this.store.select(state => state.nodes.nodes)
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
      value: "",
			x: 0,
			y: 0
		});
		this.addNodeToStorage(nodeNum,nodeName,nodeType,"",0,0);
	}

  // This adds a new node to the data service "nodes" array. However the type is set to 'functional'
  createFunctionalNode() {
	  const nodeNum = this.data.nodes.length + 1;
    const nodeName = "Functional" + (Number(this.data.nodes.length) + 1);
    const value =  this.functionalNodeSearchInput.nativeElement.value;

    this.data.nodes.push({
      num: nodeNum,
      name: nodeName,
      type: "functional",
      value: value,
      x: 0,
      y: 0
    });

    this.addNodeToStorage(nodeNum,nodeName,"functional",value,0,0);

    //Reset search section after creation of node
    this.functionalNodeSearchInput.nativeElement.value = "";
    this.isVisible = !this.isVisible;
  }

	addNodeToStorage(num,name,type,value,x,y){
	  this.store.dispatch(new AddNodeToStorage({num,name,type,value,x,y}))
  }

  /* Enables nodes search section to be shown, so the user can select a type */
  showNodeSearch(){
    this.isVisible = !this.isVisible; //Uncomment when doing demo
  }

	@ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('reference') functionalNodeSearchInput: ElementRef;
	isExpanded = true;
	showSubmenu: boolean = false;
	isShowing = false;
	isVisible = false;

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

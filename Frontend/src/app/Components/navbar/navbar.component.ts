import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../data.service";
import {MatSidenav} from "@angular/material/sidenav";
import { Store} from "@ngxs/store";
import {
  AddNodeToStorage,
  RemoveLineFromStorage,
  RemoveNodeFromStorage
} from "../../../Storage/workspace/workspace.actions";
import { WorkspaceState } from "../../../Storage/workspace/workspace.state";
import {lineConnectors, NodeData} from "../../node-data";
import { Observable } from "rxjs";
import {DOCUMENT} from "@angular/common";
import * as LeaderLine from "leader-line-new";

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  nodes$: Observable<NodeData[]>;
  public functionsList: string[] = ["add","subtract","multiply","divide"];
  public tensorList: string[] = ["variable", "constant", "tensor"];

	constructor(private data: DataService,@Inject(DOCUMENT) private document, private store: Store) {}

	ngOnInit(): void {
    this.data.nodes = [];
    this.data.lineConnectorsList = [];
    const storageNodes = this.store.selectSnapshot(WorkspaceState).nodes;
    const storageLines = this.store.selectSnapshot(WorkspaceState).lines;
    for(let i=0; i<storageNodes.length; ++i){
      this.loadNode(storageNodes[i]);
    }
    // for(let i=0; i<storageLines.length; ++i){
    //   this.loadLine(storageLines[i]);
    // }
	}

  // This adds a LOADED node from storage to the data service "nodes" array.
  loadNode(node: NodeData) {
	  this.data.nodes.push({
      num: node.num,
      name: node.name,
      type: node.type,
      value: node.value,
      x: node.x,
      y: node.y
	  });
  }

  loadLine(line: lineConnectors){
    this.data.lineConnectorsList.push({
      start: line.start,
      end: line.end,
      line: line.line
    })
    // this.addStorageLines(line);
  }

  addStorageLines(line: lineConnectors){
	  console.log(line.start);
    console.log(line.end);

    const lineObj = new LeaderLine(
      this.document.getElementById(line.start.toString()),
      this.document.getElementById(line.end.toString()), {
        // size: 6,
        // outlineColor: '#red',
        // outline: true,
        // endPlugOutline: true,
        // dash: true,
        // path: 'arc',
        startSocket: 'auto',
        endSocket: 'auto'
      }
    );
  }

  // This adds a new node to the data service "nodes" array.
	createNode() {
	  const nodeNum = this.data.nodes.length+1;
    const nodeName = "Component" + (Number(this.data.nodes.length) + 1);
    const nodeType = this.data.type;
    const value = this.tensorNodeSearchInput.nativeElement.value;

		this.data.nodes.push({
			num: nodeNum,
			name: nodeName,
			type: nodeType,
			value: value,
			x: 0,
			y: 0
		});
		this.addNodeToStorage(nodeNum, nodeName, nodeType, "", 0, 0);
		//Reset search section after creation of node
		this.tensorNodeSearchInput.nativeElement.value = "";
		this.isTensorNodeVisible = !this.isTensorNodeVisible;
	}

	// This adds a new node to the data service "nodes" array. However the type is set to 'functional'
	createFunctionalNode() {
		const nodeNum = this.data.nodes.length + 1;
		const nodeName = "Functional" + (Number(this.data.nodes.length) + 1);
		const value = this.functionalNodeSearchInput.nativeElement.value;

		this.data.nodes.push({
			num: nodeNum,
			name: nodeName,
			type: "functional",
			value: value,
			x: 0,
			y: 0
		});

		this.addNodeToStorage(nodeNum, nodeName, "functional", value, 0, 0);

		//Reset search section after creation of node
		this.functionalNodeSearchInput.nativeElement.value = "";
		this.isFunctionalNodeVisible = !this.isFunctionalNodeVisible;
	}

	addNodeToStorage(num, name, type, value, x, y) {
		this.store.dispatch(new AddNodeToStorage({num, name, type, value, x, y}))
	}

	/* Enables nodes search section to be shown, so the user can select a type */
	showFuncNodeSearch() {
		this.isFunctionalNodeVisible = !this.isFunctionalNodeVisible; //Uncomment when doing demo
	}

	showTensorNodeSearch() {
		this.isTensorNodeVisible = !this.isTensorNodeVisible; //Uncomment when doing demo
	}

	clearCanvas(){
    this.data.nodes.forEach(element => this.store.dispatch(new RemoveNodeFromStorage(element.name)))
	  this.data.lineConnectorsList.forEach(element => this.store.dispatch(new RemoveLineFromStorage(element)))
    this.data.lineConnectorsList.forEach(element => element.line?.remove())

    this.data.nodes.splice(0,this.data.nodes.length)
    this.data.lineConnectorsList.splice(0,this.data.lineConnectorsList.length)
  }

	@ViewChild('sidenav') sidenav: MatSidenav;
	@ViewChild('functionalNodeInputReference') functionalNodeSearchInput: ElementRef;
	@ViewChild('tensorNodeInputReference') tensorNodeSearchInput: ElementRef;
	isExpanded = true;

	showSubmenu: boolean = false;
	isShowing = false;
	isFunctionalNodeVisible = false;
	isTensorNodeVisible = false;

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

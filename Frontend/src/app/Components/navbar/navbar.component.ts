import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../data.service";
import {MatSidenav} from "@angular/material/sidenav";
import {Store, Select} from "@ngxs/store";
import {AddNodeToStorage} from "../../../Storage/workspace/workspace.actions";
import {NodeData} from "../../node-data";
import {Observable} from "rxjs";
import {CodeGeneratorService} from "../../code-generator.service";


@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	nodes$: Observable<NodeData[]>;
	public functionsList: string[] = ["add", "subtract", "multiply", "divide"];
	public tensorList: string[] = ["variable", "constant", "tensor"];

	constructor(private data: DataService, private store: Store) {
		this.nodes$ = this.store.select(state => state.nodes.nodes)
	}

	ngOnInit(): void {
		console.log(this.store);
	}

	// This adds a new node to the data service "nodes" array.
	createTensorNode() {
		const nodeNum = this.data.nodes.length + 1;
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

	runAndGenerate() {
    const generator : CodeGeneratorService = new CodeGeneratorService();
    // generator.runfile();
  }

  downloadCode() {
	  const generator : CodeGeneratorService = new CodeGeneratorService();
	  // generator.createFile();
  }
}

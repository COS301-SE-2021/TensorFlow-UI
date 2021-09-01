import {
	AfterViewInit,
	Component,
	DoCheck,
	ElementRef,
	Inject, IterableDiffer, IterableDiffers,
	OnChanges,
	OnInit,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import {DataService} from "../../data.service";
import {MatSidenav} from "@angular/material/sidenav";
import {Store} from "@ngxs/store";
import {
	AddLineConnectorToStorage,
	AddNodeToStorage,
	AddProjectDescription, AddProjectName, AddRootNode, AddTFNode, RemoveLineConnectionOne,
	RemoveLineFromStorage,
	RemoveNodeFromStorage, RemoveTFNode
} from "../../../Storage/workspace";
import {WorkspaceState} from "../../../Storage/workspace";
import {lineConnectors, NodeData} from "../../node-data";
import {DOCUMENT} from "@angular/common";
import * as LeaderLine from "leader-line-new";
import {CodeGeneratorService} from "../../code-generator.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {ProjectDetailsUpdatedSnackbarComponent} from "../project-details-updated-snackbar/project-details-updated-snackbar.component";
import {newNode, operatorMath, TFNode} from "../../tf";
import {SettingsPageDialogComponent} from "../settings-page-dialog/settings-page-dialog.component";
import {NavbarDialogsComponent} from "../navbar-dialogs/navbar-dialogs.component";
import * as litegraph from "litegraph.js";
import {LGraphNode, LiteGraph} from "litegraph.js";

export interface SettingsPageData {
	projectName: string,
	projectDetails: string

}

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit {

	public TFNodeList: TFNode[] = [];
	public linesList: lineConnectors[] = [];

	liteNodes: litegraph.LGraph[];
	graph: litegraph.LGraph;

	public lines;

	tftensor: string[] = ["Constant", "Variable", "Fill", "Linspace", "Zeros", "Ones"];
	_operatorMath: string[] = operatorMath;
	tfoperator: string[] = ["Add", "Add_n", "Divide", "Mod", "Negative", "Reciprocal", "Scalar Multiplication", "Sigmoid", "Subtract", "Multiply"];
	// TFList: string[] = ["Constant", "Variable", "Fill", "Linespace", "Zeros", "Ones", "Add", "Add_n", "Divide", "Mod", "Negative", "Reciprocal", "Scalar Multiplication", "Sigmoid", "Subtract", "Multiply"];

	projectName: string;
	projectDetails: string;
	public functionsList: string[] = ["add", "subtract", "multiply", "divide"];
	public tensorList: string[] = ["variable", "constant", "tensor"];

	@ViewChild('sidenav') sidenav: MatSidenav;
	@ViewChild('functionalNodeInputReference') functionalNodeSearchInput: ElementRef;
	@ViewChild('tensorNodeInputReference') tensorNodeSearchInput: ElementRef;
	isExpanded = true;

	showSubmenu: boolean = false;
	isShowing = false;
	isFunctionalNodeVisible = false;
	isTensorNodeVisible = false;

	constructor(private data: DataService, @Inject(DOCUMENT) private document, private store: Store, private snackBar: MatSnackBar,
				private dialog: MatDialog, private iterableDiffers: IterableDiffers) {
	}

	ngOnInit(): void {
		this.TFNodeList = this.store.selectSnapshot(WorkspaceState).TFNode;
		this.linesList = this.store.selectSnapshot(WorkspaceState).lines;

		this.liteNodes = [];
		this.graph = new litegraph.LGraph();

		let canvas = new litegraph.LGraphCanvas("#workspaceCanvas", this.graph);
		this.lines = this.graph.list_of_graphcanvas[0].graph.links;
	}

	ngAfterViewInit() {
		const storedNodes = this.store.selectSnapshot(WorkspaceState).TFNode;
		if (storedNodes.length > 0) {
			//recreate all these nodes;
			// console.log(storedNodes);
			for (let i = 0; i < storedNodes.length; ++i) {
				//add type nodeObject
				this.createLiteNode(storedNodes[i].selector, true, storedNodes[i], storedNodes[i]);
			}
		}
	}

	/* Enables nodes search section to be shown, so the user can select a type */
	showFuncNodeSearch() {
		this.isFunctionalNodeVisible = !this.isFunctionalNodeVisible;
	}

	showTensorNodeSearch() {
		this.isTensorNodeVisible = !this.isTensorNodeVisible;
	}

	clearCanvas() {
		const clearDialog = this.dialog.open(NavbarDialogsComponent);

		clearDialog.afterClosed().subscribe(result => {
			const clearCanvasBoolean = clearDialog.disableClose;

			if (clearCanvasBoolean) {
				const templine: lineConnectors[] = this.store.selectSnapshot(WorkspaceState).lines
				let lineObject: LeaderLine;
				for (let i = 0; i < templine.length; i++) {
					lineObject = templine[i]["line"];
					this.store.dispatch(new RemoveLineFromStorage(templine[i]));
					lineObject?.remove()
				}
				this.linesList = [];

				let root = this.store.selectSnapshot(WorkspaceState).rootNode
				root.childOne = undefined;
				this.store.dispatch(new AddRootNode(root))

				this.TFNodeList.forEach(element => this.store.dispatch(new RemoveTFNode(element)))
				this.TFNodeList = [];
			}
		})


	}

	showProjectDetails() {
		const projectDetailsDialog = this.dialog.open(SettingsPageDialogComponent,
			{
				disableClose: true,
				data: {projectName: this.projectName, projectDetails: this.projectDetails}
			}
		);

		projectDetailsDialog.afterClosed().subscribe(result => {
			const detailsAdded = projectDetailsDialog.disableClose;

			if (detailsAdded) {
				//Add to details to ngxs storage and display snackbar
				const dialogData = projectDetailsDialog.componentInstance;
				let dataOK: boolean = false;
				if ((dialogData.projectName != undefined && dialogData.projectName != "" && dialogData.projectName.match(/^ *$/) == null) && dialogData.projectDescription != undefined) {
					dataOK = true;
					this.store.dispatch(new AddProjectName(dialogData.projectName));
					this.store.dispatch(new AddProjectDescription(dialogData.projectDescription));
				}
				console.log("|" + dialogData.projectName + "|");
				console.log(dialogData.projectDescription);
				this.projectDetailsUpdatedSnackbar(dataOK);
			}
		})
	}

	projectDetailsUpdatedSnackbar(dataOk: boolean) {
		let snackBarRef = this.snackBar.openFromComponent(ProjectDetailsUpdatedSnackbarComponent,
			{
				duration: 2000,
				data: dataOk
			})
	}

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

	// Code generation section
	runAndGenerate() {
		const generator: CodeGeneratorService = new CodeGeneratorService();
		generator.runfile(this.store.selectSnapshot(WorkspaceState).rootNode, "");
	}

	downloadCode() {
		const generator: CodeGeneratorService = new CodeGeneratorService();
		generator.generateFile(this.store.selectSnapshot(WorkspaceState).rootNode);
	}

	addNewNode(node: TFNode) {
		this.store.dispatch(new AddTFNode(node));
		this.TFNodeList.push(node);
	}

	//add type TFnode object
	createLiteNode(component: string, loadFromMemory: boolean, storedNode: TFNode, tfnode: TFNode): LGraphNode {
		const node = new litegraph.LGraphNode();

		if (!loadFromMemory) {
			node.title = component;
			node.pos = [200, 200]; //ToDo: change this to be dynamic
			const that = this;
			node.onMouseDown = function () {
				const that2 = that;
				node.onMouseLeave = function () {
					that2.updateNodePositionInLocalStorage();
				}
			}
			node.onMouseEnter = function () {
				that.updateNodeLinks();
			}
			tfnode.UIStructure(node);

			this.graph.add(node);
			this.graph.start();
		} else {
			node.title = component;
			node.pos = storedNode.position;
			const that = this;
			node.onMouseDown = function () {
				const that2 = that;
				node.onMouseLeave = function () {
					that2.updateNodePositionInLocalStorage();
				}
			}
			node.onMouseEnter = function () {
				that.updateNodeLinks();
			}
			// A temporary node is created to get the structure of the UI structure of the object that has been stored in the state.
			let temp = newNode(<string>storedNode.selector)

			temp.UIStructure(node);
			// The stored node objects do not have UI components.
			// storedNode.UIStructure(node);

			this.graph.add(node);
			this.graph.start();
		}
		return node;
	}

	createComponent(component: string) {


		let tfnode: TFNode;
		let id: string = Math.random().toString(36).substr(2, 9);

		tfnode = newNode(component);
		tfnode.name = component + id;
		const liteGraphNode = this.createLiteNode(component, false, new TFNode(), tfnode);
		const links = this.graph.list_of_graphcanvas[0].graph.links;
		this.createComponentSwitchDefaults(tfnode, liteGraphNode, component);

		// console.log(liteGraphNode);
		// console.log(this.graph);
		// console.log(links);
	}

	//Sets all values which are the same across every switch statement
	createComponentSwitchDefaults(node: TFNode, liteGraphNode: LGraphNode, component: string) {
		node.selector = component;
		node.id = liteGraphNode.id;
		node.position = liteGraphNode.pos;
		this.addNewNode(node);
	}


	updateNodePositionInLocalStorage() {
		const selectedNodes = this.graph.list_of_graphcanvas[0].selected_nodes;
		for (let key in selectedNodes) {
			const node = selectedNodes[key];
			const nodeID = node.id;
			const storedNodesArray = this.store.selectSnapshot(WorkspaceState).TFNode;
			const storedNode = storedNodesArray.find(element => element.id == nodeID);
			// console.log(this.lines);
			// console.log(node);
			// console.log(storedNode);
			storedNode.position = node.pos;
			this.store.dispatch(storedNode);
		}
	}

	updateNodeLinks() {

		for (let key in this.lines) {
			const line = this.lines[key];

			const lineObj: lineConnectors = {
				id: line.id,
				origin_id: line.origin_id,
				origin_slot: line.origin_slot,
				target_id: line.target_id,
				target_slot: line.target_slot,
				type: line.type
			};

			this.store.dispatch(new AddLineConnectorToStorage(lineObj));
		}
	}

	isAnyInputConnected(node): boolean {
		for (let i = 0; i < node.inputs.length; ++i) {
			if (node.inputs[i].link != null) {
				return true;
			}
		}
		return false;
	}
}


import {
	AfterViewInit,
	Component,
	ElementRef,
	Inject, IterableDiffers,
	OnInit,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import {DataService} from "../../data.service";
import {MatSidenav} from "@angular/material/sidenav";
import {StateContext, Store} from "@ngxs/store";
import {
	AddLineConnectorToStorage,
	AddNodeToStorage,
	AddProjectDescription, AddProjectName, AddRootNode, AddTFNode, RemoveLineConnectionOne,
	RemoveLineFromStorage,
	RemoveNodeFromStorage, RemoveTFNode, UpdateTFNode, WorkspaceStateModel
} from "../../../Storage/workspace";
import {WorkspaceState} from "../../../Storage/workspace";
import {lineConnectors, NodeData} from "../../node-data";
import {DOCUMENT} from "@angular/common";
import * as LeaderLine from "leader-line-new";
import {CodeGeneratorService} from "../../code-generator.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {ProjectDetailsUpdatedSnackbarComponent} from "../project-details-updated-snackbar/project-details-updated-snackbar.component";
import {NodeStore, operatorMath, TFNode} from "../../tf";
import {SettingsPageDialogComponent} from "../settings-page-dialog/settings-page-dialog.component";
import {NavbarDialogsComponent} from "../navbar-dialogs/navbar-dialogs.component";
import {RunningDialogComponent} from "../running-dialog/running-dialog/running-dialog.component";

import * as litegraph from "litegraph.js";
import {LGraphNode, LiteGraph} from "litegraph.js";
import {Command} from "../../../Command/Command";
import {ClearCanvasCommand} from "../../../Command/ClearCanvasCommand";
import {GenerateCodeCommand} from "../../../Command/GenerateCodeCommand";
import {ProjectDetailsCommand} from "../../../Command/ProjectDetailsCommand";
import projectList from "../../Workspace/import/import.component";

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
	public tensorNodeObjectList: TFNode[] = [];
	public linesList: lineConnectors[] = [];
	public clearCanvasCommand = new ClearCanvasCommand(this.store,this);
	public generateCodeCommand = new GenerateCodeCommand(this.store);
  	public projectDetailsCommand = new ProjectDetailsCommand(this.store,this);
  	public screenWidth = screen.width;
  	public screenHeight = screen.height;
	public lines;
	liteNodes: litegraph.LGraph[];
	graph: litegraph.LGraph;

	listOfNodes: string[] = Object.keys(NodeStore);
	tftensor: string[] = ["Constant", "Variable", "Fill", "Linspace", "Zeros", "Ones"];
	_operatorMath: string[] = operatorMath;
	tfoperator: string[] = ["Add", "Add_n", "Divide", "Mod", "Negative", "Reciprocal", "Scalar Multiplication", "Sigmoid", "Subtract", "Multiply"];
	// TFList: string[] = ["Constant", "Variable", "Fill", "Linespace", "Zeros", "Ones", "Add", "Add_n", "Divide", "Mod", "Negative", "Reciprocal", "Scalar Multiplication", "Sigmoid", "Subtract", "Multiply"];

	projectName: string;
	projectDetails: string;

	public currentDrawer:string = "Import/Export";
	public oldLineConnectors: lineConnectors[] =[];

	@ViewChild('functionalNodeInputReference') functionalNodeSearchInput: ElementRef;
	@ViewChild('tensorNodeInputReference') tensorNodeSearchInput: ElementRef;

	constructor(private data: DataService, @Inject(DOCUMENT) private document, private store: Store, public snackBar: MatSnackBar,
              public dialog: MatDialog, private iterableDiffers: IterableDiffers) {
	}

	ngOnInit(): void {
		this.TFNodeList = this.store.selectSnapshot(WorkspaceState).TFNode;
		this.linesList = this.store.selectSnapshot(WorkspaceState).lines;

		this.liteNodes = [];
		this.graph = new litegraph.LGraph();
	}

	ngAfterViewInit() {
	  let el = document.getElementsByClassName("mat-tab-header")[0] as HTMLElement;
		if (el!=null){
		  el.style.display = "none";
		}
		let canvas = new litegraph.LGraphCanvas("#Canvas", this.graph);
		this.lines = this.graph.list_of_graphcanvas[0].graph.links;

		// let previewCanvas = new litegraph.LGraphCanvas("#previewCanvas", this.graph);
		const storedNodes = this.store.selectSnapshot(WorkspaceState).TFNode;
		const nodesOnCanvas: LGraphNode[] = [];
		const rootNode = this.store.selectSnapshot(WorkspaceState).rootNode;

		//if else statement to load or create a root node onto the canvass
		if(rootNode==undefined){
			let tensorRoot = new NodeStore["RootNode"]();
			tensorRoot.name = "RootNode";

			const liteGraphNode = this.createLiteNode("RootNode", false, tensorRoot);
			this.createRootNodeHelper(tensorRoot, liteGraphNode);
		}
		else{
			let tensorRoot = new NodeStore["RootNode"]();
			tensorRoot.name = "Root";
			nodesOnCanvas.push(this.createLiteNode("RootNode",true,rootNode));
		}

		if(storedNodes.length>0){
			//recreate all these nodes;
			// console.log(storedNodes);
			for(let i=0; i<storedNodes.length;++i){
			 	nodesOnCanvas.push(this.createLiteNode(storedNodes[i].selector,true,storedNodes[i]));
			}

			// recreate all line connectors from memory
			const storedLinks = this.store.selectSnapshot(WorkspaceState).links;

			// console.log(storedLinks);
			// console.log(nodesOnCanvas);

			for(let item of storedLinks){
				const targetNodeID = item.target_id;
				const originNodeID = item.origin_id;

				const targetNode = nodesOnCanvas.find(element => element.id === targetNodeID);
				const originNode = nodesOnCanvas.find(element => element.id === originNodeID);

				if(originNode && targetNode) {
					originNode.connect(item.origin_slot, targetNode, item.target_slot);
				}
			}
		}

	}

	createRootNodeHelper(node: TFNode, liteGraphNode: LGraphNode){
		node.selector = "RootNode";
		node.id = liteGraphNode.id;
		node.position = liteGraphNode.pos;
		node.inputs = liteGraphNode.inputs;
		node.outputs = liteGraphNode.outputs;

		this.store.dispatch(new AddRootNode(node))
		// this.TFNodeList.push(node);
	}

	/*clearCanvas() {
	  this.command = new ClearCanvasCommand();
	  this.command.execute();

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


	}*/

	/*showProjectDetails() {
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
	}*/

	/*projectDetailsUpdatedSnackbar(dataOk: boolean) {
		let snackBarRef = this.snackBar.openFromComponent(ProjectDetailsUpdatedSnackbarComponent,
			{
				duration: 2000,
				data: dataOk
			})
	}*/

	setDrawerType(drawerType: string){
		this.currentDrawer = drawerType;
	}

	// Code generation section

  	runCode() {
	  const generator : CodeGeneratorService = new CodeGeneratorService();
	  console.log(this.tensorNodeObjectList);
    	generator.runFile(this.store.selectSnapshot(WorkspaceState).rootNode,this.tensorNodeObjectList,this.store.selectSnapshot(WorkspaceState).links, "localhost:5000");
  	}

	runAndGenerate() {
		const generator: CodeGeneratorService = new CodeGeneratorService();
		generator.runFile(this.store.selectSnapshot(WorkspaceState).rootNode, this.store.selectSnapshot(WorkspaceState).TFNode,this.lines,"");
	}

	/*downloadCode() {
		const generator: CodeGeneratorService = new CodeGeneratorService();
		generator.generateFile(this.store.selectSnapshot(WorkspaceState).rootNode);
	}*/

	addNewNode(node: TFNode, lgraphNode: LGraphNode) {

		// console.log(node);
		// console.log(lgraphNode);

		this.store.dispatch(new AddTFNode(node));
		this.TFNodeList.push(node);
		this.tensorNodeObjectList.push(node);
	}

	//add type TFnode object
	createLiteNode(component: string, loadFromMemory: boolean, tempNode: TFNode): LGraphNode {
		const node = new litegraph.LGraphNode();

		if (!loadFromMemory) {
			node.title = component;
			node.pos = [200, 200]; //ToDo: change this to be dynamic
			const that = this;
			node.onMouseDown = function () {
				const that2 = that;
				node.onMouseLeave = function () {
					if(component=="RootNode")
						that2.updateNodePositionInLocalStorage(true);
					else
						that2.updateNodePositionInLocalStorage(false);
				}
			}
			node.onMouseEnter = function () {
				that.updateNodeLinks();
			}
			tempNode.UIStructure(node);

			this.graph.add(node);
			this.graph.start();
		} else {
			node.title = component;
			node.pos = tempNode.position;
			const that = this;
			node.onMouseDown = function () {
				const that2 = that;
				node.onMouseLeave = function () {
					if(component=="RootNode")
						that2.updateNodePositionInLocalStorage(true);
					else
						that2.updateNodePositionInLocalStorage(false);
				}
			}
			node.onMouseEnter = function () {
				that.updateNodeLinks();
			}
			// A temporary node is created to get the structure of the UI structure of the object that has been stored in the state.
			let temp: TFNode = new NodeStore[tempNode.selector]();
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

		tfnode = new NodeStore[component]();
		tfnode.name = component + id;
		const liteGraphNode = this.createLiteNode(component, false, tfnode);
		const links = this.graph.list_of_graphcanvas[0].graph.links;
		this.createComponentSwitchDefaults(tfnode, liteGraphNode, component);

		// console.log(liteGraphNode);
		// console.log(this.graph);
		// console.log(links);
	}

  	popList() {
		let el = document.getElementById("popCommunityList") as HTMLElement;
		if(el){
			el.click();
		}
	  }

	//Sets all values which are the same across every switch statement
	createComponentSwitchDefaults(node: TFNode, liteGraphNode: LGraphNode, component: string) {
		node.selector = component;
		node.id = liteGraphNode.id;
		node.position = liteGraphNode.pos;
		node.inputs = liteGraphNode.inputs;
		node.outputs = liteGraphNode.outputs;

		this.addNewNode(node,liteGraphNode);
	}

	updateNodePositionInLocalStorage(isRootNode: boolean) {
		const selectedNodes = this.graph.list_of_graphcanvas[0].selected_nodes;

		for (let key in selectedNodes) {
			const node = selectedNodes[key];
			const nodeID = node.id;
			if(isRootNode){
				const storedRootNode = this.store.selectSnapshot(WorkspaceState).rootNode;
				storedRootNode.position = node.pos;
				this.store.dispatch(new UpdateTFNode(storedRootNode));
			}
			else
			{
				const storedNodesArray = this.store.selectSnapshot(WorkspaceState).TFNode;
				const storedNode = storedNodesArray.find(element => element.id == nodeID);
				storedNode.position = node.pos;
				this.store.dispatch(new UpdateTFNode(storedNode));
			}
		}
	}

	updateNodeLinks() {
		this.lines = this.graph.list_of_graphcanvas[0].graph.links;
		let linesLength=0;

		for(let key in this.lines){
			++linesLength;
		}

		//To remove a line from storage when line connector is disconnected
		//Iterate oldLines array and delete the item which does not match up to this.lines array
		if(linesLength>0){
			if(linesLength < this.oldLineConnectors.length){
				for(let i=0; i<this.oldLineConnectors.length; ++i){

					const line = this.oldLineConnectors[i];
					let lineNotFound: boolean = false;

					for(let key in this.lines) {

						let item = this.lines[key];
						if (item.id === line.id && item.origin_id == line.origin_id &&
							item.target_id === line.target_id) {
							lineNotFound = true;
						}
					}

					//If line was not found in the litegraph lines array, then remove it from the oldLineConnectors array
					if(!lineNotFound){
						this.oldLineConnectors.splice(i,1);
						this.store.dispatch(new RemoveLineFromStorage(line))
						break;
					}
				}
			}
		}
		else if(linesLength==0 && this.store.selectSnapshot(WorkspaceState).links.length>0){ //To remove all lines in storage if there are no lines on the canvas
			for(let i=0; i<this.oldLineConnectors.length; ++i){

				const line = this.oldLineConnectors[i];
				this.store.dispatch(new RemoveLineFromStorage(line));
			}
		}

		for(let key in this.lines){
			const line = this.lines[key];

			const lineObj: lineConnectors = {
				id: line.id,
				origin_id: line.origin_id,
				origin_slot: line.origin_slot,
				target_id: line.target_id,
				target_slot: line.target_slot,
				type: line.type
			};

			//Only add line Connectors which have not yet been added to the links array - required
			if(this.objectIsNotInOldConnectorsArray(lineObj)){
				this.oldLineConnectors.push(lineObj);
				this.store.dispatch(new AddLineConnectorToStorage(lineObj))
				const nodes = this.store.selectSnapshot(WorkspaceState).TFNode;

				//In case output of line was not linked correctly
				const nodeInputID = lineObj.target_id;
				let nodeInput = nodes.find(element => element.id == nodeInputID);

				if(nodeInput!=undefined) {
					nodeInput.inputs[lineObj.target_slot].id = lineObj.id;
				}
			}
		}
	}

	objectIsNotInOldConnectorsArray(lineObj: lineConnectors): boolean{

		for(const line of this.oldLineConnectors){
			if(line.id === lineObj.id && line.origin_id === lineObj.origin_id && line.target_id == lineObj.target_id){
				return false;
			}
		}

		return true;
	}
}

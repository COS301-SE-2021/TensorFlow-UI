import { AfterViewInit, Component, DoCheck, Inject, OnChanges, OnInit, SimpleChanges, } from '@angular/core';
import { DataService } from "../../data.service";
import { Select, StateContext, Store } from "@ngxs/store";
import { AddLineConnectorToStorage, AddNodeToStorage, AddProjectDescription, AddProjectName, AddRootNode, AddTFNode, RemoveLineConnectionOne, RemoveLineFromStorage, RemoveNodeFromStorage, RemoveTFNode, UpdateTFNode, WorkspaceStateModel } from "../../../Storage/workspace";
import { WorkspaceState } from "../../../Storage/workspace";
import { lineConnectors, NodeData } from "../../node-data";
import { DOCUMENT } from "@angular/common";
import { CodeGeneratorService } from "../../code-generator.service";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { ProjectDetailsUpdatedSnackbarComponent } from "../project-details-updated-snackbar/project-details-updated-snackbar.component";
import { NodeStore, tensorFlowTypesArray, TFNode } from "../../tf";
import { SettingsPageDialogComponent } from "../settings-page-dialog/settings-page-dialog.component";
import { NavbarDialogsComponent } from "../navbar-dialogs/navbar-dialogs.component";
import { RunningDialogComponent } from "../running-dialog/running-dialog/running-dialog.component";

import * as litegraph from "litegraph.js";
import {LGraphNode, LiteGraph} from "litegraph.js";
import {Command} from "../../../Command/Command";
import {ClearCanvasCommand} from "../../../Command/ClearCanvasCommand";
import {GenerateCodeCommand} from "../../../Command/GenerateCodeCommand";
import {ProjectDetailsCommand} from "../../../Command/ProjectDetailsCommand";
import {KeyValueChanges, KeyValueDiffer, KeyValueDiffers} from "@angular/core";
import { TFRootNode } from "../../tf/rootNode/rootNode";
import {RunCodeCommand} from "../../../Command/RunCodeCommand";
import {CommandHistory} from "../../../Command/CommandHistory";
import {MatTabGroup} from "@angular/material/tabs";
import {userVariableNames} from "../../tf/userVariableNames";
import {AddNodeCommand} from "../../../Command/AddNodeCommand";
import {GitAPI} from "../../git-api";
import {ReloadFromStoreCommand} from "../../../Command/ReloadFromStoreCommand";
import {DeleteNodeCommand} from "../../../Command/DeleteNodeCommand";
import { TutorialModalMaterialComponent } from "../../Tutorial/tutorial-modal-material/tutorial-modal-material/tutorial-modal-material.component";
import {TutorialServiceService} from "../../Tutorial/tutorial-service.service";

export interface SettingsPageData {
	projectName: string,
	projectDetails: string
}

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit, DoCheck, OnChanges {

	public linesDiffer: KeyValueDiffer<string, any>;
	public nodeDiffers: KeyValueDiffer<string, any>;
    public gitAPI: GitAPI;
	public TFNodeList: TFNode[] = [];
	public rootNode: TFNode = new TFNode();
	public linesList: lineConnectors[] = [];
	public commandHistory = new CommandHistory();
	public clearCanvasCommand = new ClearCanvasCommand(this.store,this);
	public generateCodeCommand = new GenerateCodeCommand(this.store,this,this.dialog);
	public projectDetailsCommand = new ProjectDetailsCommand(this.store,this);
	public runCodeCommand = new RunCodeCommand(this.store,this,this.dialog);
	public addNodeCommand = new AddNodeCommand(this.store,this);
	public reloadCommand = new ReloadFromStoreCommand(this.store,this);
	public deleteNodeCommand = new DeleteNodeCommand(this.store,this)
	public screenWidth = screen.width;
	public screenHeight = screen.height;
	public lines;
	public selectedNode=null;
	public LGroot: LGraphNode;
	graph: litegraph.LGraph;

	listOfNodes: string[] = Object.keys(NodeStore);

	projectName: string;
	projectDetails: string;

	public operatorsArray = tensorFlowTypesArray.operatorsArray;
	public modelsArray = tensorFlowTypesArray.modelArray;
	public tensorsArray = tensorFlowTypesArray.tensorsArray;
	public layersArray = tensorFlowTypesArray.layersArray;
	public constraintsArray = tensorFlowTypesArray.constraints;

	public currentDrawer: string = "Import/Export";

	constructor(private data: DataService, @Inject(DOCUMENT) private document, public store: Store, public snackBar: MatSnackBar,
                public dialog: MatDialog, public differs: KeyValueDiffers) {
	}

	ngOnInit(): void {
        this.gitAPI = GitAPI.getInstance(this.store);

		// this.TFNodeList = this.store.selectSnapshot(WorkspaceState).TFNode;
		//this.liteNodes = [];
		this.linesList = this.store.selectSnapshot(WorkspaceState).links;
		this.graph = new litegraph.LGraph();
		let canvas = new litegraph.LGraphCanvas("#workspaceCanvas", this.graph);
		this.lines = this.graph.list_of_graphcanvas[0].graph.links;
		this.linesDiffer = this.differs.find(this.lines).create();
		// this.nodesDiffer = this.differs.find(this.liteNodes).create();
	}

	ngAfterViewInit() {
		let el = document.getElementsByClassName("mat-tab-header")[0] as HTMLElement;
		if (el != null) {
			el.style.display = "none";
		}

		const rootNode = this.store.selectSnapshot(WorkspaceState).rootNode;

		//if else statement to load or create a root node onto the canvass
		if (rootNode == undefined) {
			let tensorRoot = new TFRootNode();
			tensorRoot.name = "RootNode";

			const liteGraphNode = this.createLiteNode("RootNode", false, tensorRoot);
			this.createRootNodeHelper(tensorRoot, liteGraphNode);
			this.LGroot = liteGraphNode;
		}
		else{

            this.LGroot = this.createLiteNode("RootNode",true,rootNode)
		}
        this.reloadCommand.execute();
	}

	ngDoCheck(): void {
		const linesChange = this.linesDiffer.diff(this.lines);
		if (linesChange) {
			this.linesChanged(linesChange);
		}

		// const nodesChange = this.nodesDiffer.diff(this.liteNodes);
		// if(nodesChange){
		// 	this.updateNodeData(nodesChange);
		// }
	}

	ngOnChanges(changes: SimpleChanges): void {
	}

	createRootNodeHelper(node: TFNode, liteGraphNode: LGraphNode) {
		node.selector = "RootNode";
		node.id = liteGraphNode.id;
		node.position = liteGraphNode.pos;
		node.inputs = liteGraphNode.inputs;
		node.outputs = liteGraphNode.outputs;
		node.UIStructure(liteGraphNode);
		this.store.dispatch(new AddRootNode(node));
		this.rootNode = node;
	}

	setDrawerType(drawerType: string) {
		this.currentDrawer = drawerType;
	}

	// Code generation section
	/*runCode() {
		const generator : CodeGeneratorService = new CodeGeneratorService(this.store);
		generator.runFile(this.store.selectSnapshot(WorkspaceState).rootNode,this.TFNodeList,this.store.selectSnapshot(WorkspaceState).links, "localhost:5000");
	}*/

	runAndGenerate() {
		// const generator: CodeGeneratorService = new CodeGeneratorService();
		// generator.runFile(this.store.selectSnapshot(WorkspaceState).rootNode, "");
	}

	/*downloadCode() {
		const generator: CodeGeneratorService = new CodeGeneratorService();
		generator.generateFile(this.store.selectSnapshot(WorkspaceState).rootNode);
	}*/

	runTutorial() {
		const tutorialService: TutorialServiceService = new TutorialServiceService(this, this.store, this.dialog);
		tutorialService.runTutorial(this.store, this.rootNode, this.TFNodeList, this.lines, "http://localhost:5000/");
	}

	addNewNode(node: TFNode, lgraphNode: LGraphNode) {

		// console.log(node);
		// console.log(lgraphNode);

		this.store.dispatch(new AddTFNode(node));
		this.TFNodeList.push(node);
	}

	createLiteNode(component: string, loadFromMemory: boolean, tempNode: TFNode): LGraphNode {
		const node = new litegraph.LGraphNode();

		if (!loadFromMemory) {
			node.title = component;
			node.pos = [200, 200];

			const that = this;
			node.onMouseDown = function () {
				const that2 = that;
				node.onMouseLeave = function () {
					if (component == "RootNode")
						that2.updateNodePositionInLocalStorage(true);
					else
						that2.updateNodePositionInLocalStorage(false);
				}
			}
			node.onSelected = function (){
				that.firstClickOnNode(node);
			}
			node.onDeselected =function (){
				that.nodeDoubleClicked(node,false,true);
			}

			// tempNode.UIStructure(node,this);
			this.graph.add(node);
			this.graph.start();
		} else {
			node.title = component;
			node.pos = tempNode.position;
			const that = this;
			node.onMouseDown = function () {
				const that2 = that;
				node.onMouseLeave = function () {
					if (component == "RootNode")
						that2.updateNodePositionInLocalStorage(true);
					else
						that2.updateNodePositionInLocalStorage(false);
				}
			}
			node.onSelected = function () {
				that.firstClickOnNode(node);
			}
			node.onDeselected = function () {
				that.nodeDoubleClicked(node, false, true);
			}

			// A temporary node is created to get the structure of the UI structure of the object that has been stored in the state.

			let temp: TFNode;
			if (tempNode.selector == "RootNode") {
				temp = new TFRootNode();
			}
			else {
				temp = new NodeStore[tempNode.selector]();
			}
			temp.widgets = tempNode.widgets;
			temp.name = tempNode.name;
			temp.id = tempNode.id;
			temp.selector = tempNode.selector;
			temp.inputs = tempNode.inputs;
			temp.outputs = tempNode.outputs;
			temp.position = tempNode.position;
			temp.UIStructure(node, this);
			if (temp.name != null) {
				userVariableNames.push(temp.name);
			}
			if (tempNode.selector !== "RootNode") {
				this.TFNodeList.push(temp);
			}
			else {
				this.rootNode = temp;
			}

			node.onSelected = function () {
				that.firstClickOnNode(node);
			}
			node.onDeselected = function () {
				that.nodeDoubleClicked(node, false, true);
			}

			this.graph.add(node);
			this.graph.start();
		}
		return node;
	}

	updateNodePositionInLocalStorage(isRootNode: boolean) {

		let selectedNodes;
		if (isRootNode)
			selectedNodes = this.graph.list_of_graphcanvas[1].selected_nodes;
		else
			selectedNodes = this.graph.list_of_graphcanvas[1].selected_nodes;

		for (let key in selectedNodes) {
			const node = selectedNodes[key];
			const nodeID = node.id;
			if (isRootNode) {
				const storedRootNode = this.store.selectSnapshot(WorkspaceState).rootNode;
				storedRootNode.position = node.pos;
				this.store.dispatch(storedRootNode);
			}
			else {
				const storedNodesArray = this.store.selectSnapshot(WorkspaceState).TFNode;
				const storedNode = storedNodesArray.find(element => element.id == nodeID);
				storedNode.position = node.pos;
				this.store.dispatch(storedNode);
			}
		}
	}

	//Updates a specific node's widget in the store once a widget is changed/update
	updateNodeWidgetsDataInStore(node: TFNode) {
		const nodesInStorage = this.store.selectSnapshot(WorkspaceState).TFNode;
		const nodeToUpdate = nodesInStorage.find(element => element.id === node.id);

		nodeToUpdate.widgets = node.widgets;
		this.store.dispatch(new UpdateTFNode(nodeToUpdate));
	}

	updateNodeNameInStore(node: TFNode) {
		const nodesInStorage = this.store.selectSnapshot(WorkspaceState).TFNode;
		const nodeToUpdate = nodesInStorage.find(element => element.id === node.id);
		nodeToUpdate.name = node.name;
		this.store.dispatch(new UpdateTFNode(nodeToUpdate));
	}

	async linesChanged(changes: KeyValueChanges<string, any>) {

		const storageLinks = this.store.selectSnapshot(WorkspaceState).links;
		//Remove all lines in the canvas before applying change
		for (let key of storageLinks) {
			await this.store.dispatch(new RemoveLineFromStorage(key));
		}

		for (let key in this.lines) {
			const link = this.lines[key];

			const lineObj: lineConnectors = {
				id: link.id,
				origin_id: link.origin_id,
				origin_slot: link.origin_slot,
				target_id: link.target_id,
				target_slot: link.target_slot,
				type: link.type
			};

			this.store.dispatch(new AddLineConnectorToStorage(lineObj))
			this.changeAllOfTheLinksInputsAndOutputs(link);
		}
	}

	changeAllOfTheLinksInputsAndOutputs(link: litegraph.LLink) {

		const sourceNodeID = link.origin_id;
		const targetNodeID = link.target_id;

		const nodesList = this.TFNodeList;
		let sourceNode = nodesList.find(element => element.id == sourceNodeID);
		let targetNode = nodesList.find(element => element.id == targetNodeID);

		if (targetNode == undefined)
			targetNode = this.rootNode;

		// @ts-ignore
		// if(sourceNode&&targetNode) {
		// 	sourceNode.outputs[link.origin_slot].id = 1;
		// 	targetNode.inputs[link.target_slot].link = link.id;
		// }
		targetNode.inputs[link.target_slot].link = link.id;
	}

	executeAddNodeCommand(c: string) {
		this.addNodeCommand.setComponent(c);
		this.addNodeCommand.execute();
		this.commandHistory.push(this.addNodeCommand);
	}

	executeCommand(com: Command) {
		if (com.execute()) {
			this.commandHistory.push(com);
		}
	}


	undo() {
		let c = this.commandHistory.get();
		c?.undo();
	}

	redo() {
		let c = this.commandHistory.restore();
		c?.execute();
	}

	//For changing the canvas - when called it will show the desired tab on click and hide it when the button is clicked again
	changeTabIndex(index: number, tab: MatTabGroup) {
		if (tab.selectedIndex !== index) {
			tab.selectedIndex = index
		}
		else
			tab.selectedIndex = 0;
	}

	firstClickOnNode(node) {

		const that = this;
		let doubleClick: boolean = true;
		node.onMouseDown = function () {
			let firstClick = true;
			that.nodeDoubleClicked(node, doubleClick);
		}
		setTimeout(function () {
			doubleClick = false;
		}, 300)

	}

	nodeDoubleClicked(node, doubleClick: boolean, closeNode?: boolean) {
		// console.log(doubleClick);

		if (doubleClick) {
			//console.log((typeof node) == (typeof LGraphNode) ? "yes" : "No");
			if (this.selectedNode == null)
				this.selectedNode = node;
			else
				this.selectedNode = null;
		}
		if (closeNode) {
			this.selectedNode = null;
		}
	}

    poplist() {
	    this.gitAPI.GetList();
    }
}

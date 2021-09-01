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
import {
	TFAdd,
	TFAddN,
	TFConstant, TFDivide,
	TFFill,
	TFLinespace, TFMod, TFMultiply, TFNegative, TFNode,
	TFOnes,
	TFOperator, TFReciprocal, TFScalarMul, TFSigmoid, TFSubtract,
	TFTensor,
	TFVariable,
	TFZeros
} from "../../tf";
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
export class NavbarComponent implements OnInit, AfterViewInit{

	public TFNodeList: TFNode[] = [];
	public linesList: lineConnectors[] = [];

	liteNodes: litegraph.LGraph[];
	graph: litegraph.LGraph;

	public lines;

	tftensor: string[] = ["Constant", "Variable", "Fill", "Linspace", "Zeros", "Ones"];
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
		if(storedNodes.length>0){
			//recreate all these nodes;
			// console.log(storedNodes);
			for(let i=0; i<storedNodes.length;++i){
				this.createLiteNode(storedNodes[i].selector,true,storedNodes[i]);
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
				if ((dialogData.projectName != undefined && dialogData.projectName!="" && dialogData.projectName.match(/^ *$/) == null) && dialogData.projectDescription != undefined) {
					dataOK = true;
					this.store.dispatch(new AddProjectName(dialogData.projectName));
					this.store.dispatch(new AddProjectDescription(dialogData.projectDescription));
				}
				console.log("|"+dialogData.projectName+"|");
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

	addNewNode(node: TFNode, lgraphNode: LGraphNode) {

		console.log(node);
		console.log(lgraphNode);


		this.store.dispatch(new AddTFNode(node));
		this.TFNodeList.push(node);
	}

	createLiteNode(component:string, loadFromMemory: boolean, storedNode:TFNode): LGraphNode {
		const node = new litegraph.LGraphNode();

		if(!loadFromMemory) {
			node.title = component;
			node.pos = [200, 200]; //ToDo: change this to be dynamic
			const that = this;
			node.onMouseDown = function (){
				const that2 = that;
				node.onMouseLeave = function (){
					that2.updateNodePositionInLocalStorage();
				}
			}
			node.onMouseEnter = function (){
				that.updateNodeLinks()
			}
			if (this.tftensor.includes(component)) {
				this.insertTensorData(node, component);
			} else {
				this.insertOperatorData(node, component);
			}
			this.graph.add(node);
			this.graph.start();
		}
		else{
			node.title = component;
			node.pos = storedNode.position;
			const that = this;
			node.onMouseDown = function (){
				const that2 = that;
				node.onMouseLeave = function (){
					that2.updateNodePositionInLocalStorage();
				}
			}
			node.onMouseEnter = function (){
				that.updateNodeLinks()
			}
			if (this.tftensor.includes(<string>storedNode.selector)) {
				this.insertTensorData(node,<string>storedNode.selector);
			} else {
				this.insertOperatorData(node, <string>storedNode.selector);
			}
			this.graph.add(node);
			this.graph.start();
		}
		return node;
	}

	createComponent(component: string) {

		const liteGraphNode = this.createLiteNode(component,false,new TFNode());
		const links = this.graph.list_of_graphcanvas[0].graph.links;
		console.log(liteGraphNode);
		console.log(this.graph);
		console.log(links);

		let tfnode: TFNode;
		let id: string = Math.random().toString(36).substr(2, 9);
		switch (component) {
			case this.tftensor[0]: {
				tfnode = new TFConstant();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tftensor[1]: {
				tfnode = new TFVariable();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tftensor[2]: {
				tfnode = new TFFill();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tftensor[3]: {
				tfnode = new TFLinespace();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tftensor[4]: {
				tfnode = new TFZeros();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tftensor[5]: {
				tfnode = new TFOnes();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tfoperator[0]: {
				tfnode = new TFAdd();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tfoperator[1]: {
				tfnode = new TFAddN();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tfoperator[2]: {
				tfnode = new TFDivide();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tfoperator[3]: {
				tfnode = new TFMod();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tfoperator[4]: {
				tfnode = new TFNegative();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tfoperator[5]: {
				tfnode = new TFReciprocal();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tfoperator[6]: {
				tfnode = new TFScalarMul();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tfoperator[7]: {
				tfnode = new TFSigmoid();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tfoperator[8]: {
				tfnode = new TFSubtract();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			case this.tfoperator[9]: {
				tfnode = new TFMultiply();
				tfnode.name = component + id;
				this.createComponentSwitchDefaults(tfnode,liteGraphNode,component);
				break;
			}
			default: {
				break;
			}
		}
	}

	//Sets all values which are the same across every switch statement
	createComponentSwitchDefaults(node: TFNode,liteGraphNode: LGraphNode, component:string){
		node.selector = component;
		node.id = liteGraphNode.id;
		node.position = liteGraphNode.pos;
		node.inputs = liteGraphNode.inputs;
		node.outputs = liteGraphNode.outputs;
		this.addNewNode(node,liteGraphNode);
	}

	insertTensorData(node: LGraphNode, component: string){
		switch (component){
			case "Variable":{
				// node.addWidget("button", "initialValue", "tf.Tensor","variableName");
				node.addWidget("toggle","trainable(optional)",false,"onDeselected",{values: [true,false]})
				node.addWidget("text","name(optional)","uniqueID","variableID");
				node.addWidget("combo","dtype(optional)","float","variableDType",{values: ["float32","int32","bool","complex64","string"]});
				node.addInput("tf.Tensor","Tensor");
				node.addOutput("Variable","tf.Tensor");

				//ToDo: Change how input is viewed
				break;
			}
			case "Constant":{
				node.addWidget("number","constant",0,"constant");
				node.addOutput("Value","tf.Tensor")
				break;
			}
			case "Fill":{
				node.addWidget("text","shape","[0,4,2]","fillShape");
				node.addWidget("text","value",0,"fillShape");
				node.addWidget("combo","dtype(optional)","float","fillDType",{values: ["float32","int32","bool","complex64","string"]});
				node.addOutput("Fill","tf.Tensor")
				//Todo: Change default width
				break;
			}
			case "Linspace":{
				node.addWidget("number","start",0,"linspaceStart");
				node.addWidget("number","stop",0,"linspaceStop");
				node.addWidget("number","num",1,"linspaceNum");
				node.addOutput("linspace sequence","tf.Tensor")
				break;
			}
			case "Zeros":{
				node.addWidget("text","shape","[0,2,4]","zerosShape");
				node.addWidget("combo","dtype(optional)","float","zerosDType",{values: ["float32","int32","bool","complex64","string"]});
				node.addOutput("Tensor zeros","tf.Tensor")
				break;
			}
			case "Ones":{
				node.addWidget("text","shape","[0,2,4]","onesShape");
				node.addWidget("combo","dtype(optional)","float","zerosDType",{values: ["float32","int32","bool","complex64","string"]});
				node.addOutput("Tensor ones","tf.Tensor")
				break;
			}

		}
	}

	insertOperatorData(node: LGraphNode, component: string){
		switch (component) {
			case "Add":{
				node.addInput("A","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
				node.addInput("B","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
				node.addOutput("A+B","tf.Tensor");
				break;
			}
			case "Add_n":{
				node.addInput("tensors(Array)","Array"); //ToDo: Ensure this array can receive a sample array, must be same shape and dtype
				node.addOutput("Tensor list","tf.Tensor");
				break;
			}
			case "Divide":{
				node.addInput("A","tf.Tensor");
				node.addInput("B","tf.Tensor");
				node.addOutput("A/B","tf.Tensor");
				break;
			}
			case "Multiply":{
				node.addInput("A","tf.Tensor");
				node.addInput("B","tf.Tensor");
				node.addOutput("A*B","tf.Tensor");
				break;
			}
			case "Mod":{
				node.addInput("A","tf.Tensor");
				node.addInput("B","tf.Tensor");
				node.addOutput("A%B","tf.Tensor")
				break;
			}
			case "Negative":{
				node.addInput("A","tf.Tensor");
				node.addOutput("-(A)","tf.Tensor");
				break;
			}
			case "Reciprocal":{
				node.addInput("X","tf.Tensor");
				node.addOutput("1/X","tf.Tensor");
				break;
			}
			case "Sigmoid":{
				node.addInput("X","tf.Tensor");
				node.addOutput("1/1+exp(-x)", "tf.Tensor");
				break;
			}
			case "Subtract":{
				node.addInput("A","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
				node.addInput("B","tf.Tensor"); //should be tf.Tensor|TypedArray|Array
				node.addOutput("A-B","tf.Tensor");
				break;
			}
		}
	}

	updateNodePositionInLocalStorage(){
		const selectedNodes = this.graph.list_of_graphcanvas[0].selected_nodes;
		for(let key in selectedNodes){
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

	updateNodeLinks(){

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

			this.store.dispatch(new AddLineConnectorToStorage(lineObj));
		}
	}

	isAnyInputConnected(node): boolean{
		for(let i=0; i<node.inputs.length; ++i){
			if(node.inputs[i].link != null){
				return true;
			}
		}
		return false;
	}
}
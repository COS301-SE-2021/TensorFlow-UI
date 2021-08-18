import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../data.service";
import {MatSidenav} from "@angular/material/sidenav";
import {Store} from "@ngxs/store";
import {
  AddNodeToStorage,
  AddProjectDescription, AddProjectName, AddRootNode, AddTFNode,
  RemoveLineFromStorage,
  RemoveNodeFromStorage, RemoveTFNode
} from "../../../Storage/workspace";
import {WorkspaceState} from "../../../Storage/workspace";
import {lineConnectors, NodeData} from "../../node-data";
import {Observable} from "rxjs";
import {DOCUMENT} from "@angular/common";
import * as LeaderLine from "leader-line-new";
import {CodeGeneratorService} from "../../code-generator.service";
import {MatDialog} from "@angular/material/dialog";
import {NavbarDialogsComponent} from "../navbar-dialogs/navbar-dialogs.component";
import {SettingsPageDialogComponent} from "../settings-page-dialog/settings-page-dialog.component";
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

export interface SettingsPageData {
	projectName: string,
	projectDetails: string

}

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	public TFNodeList: TFNode[] = [];

	tftensor: string[] = ["Constant", "Variable", "Fill", "Linespace", "Zeros", "Ones"];
	tfoperator: string[] = ["Add", "Add_n", "Divide", "Mod", "Negative", "Reciprocal", "Scalar Multiplication", "Sigmoid", "Subtract", "Multiply"];
	// TFList: string[] = ["Constant", "Variable", "Fill", "Linespace", "Zeros", "Ones", "Add", "Add_n", "Divide", "Mod", "Negative", "Reciprocal", "Scalar Multiplication", "Sigmoid", "Subtract", "Multiply"];

	nodes$: Observable<NodeData[]>;
	projectName: string;
	projectDetails: string;
	public functionsList: string[] = ["add", "subtract", "multiply", "divide"];
	public tensorList: string[] = ["variable", "constant", "tensor"];

	constructor(private data: DataService, @Inject(DOCUMENT) private document, private store: Store, public dialog: MatDialog
		, private snackBar: MatSnackBar) {
	}

	ngOnInit(): void {
		this.TFNodeList = this.store.selectSnapshot(WorkspaceState).TFNode;
		this.data.nodes = [];
		this.data.lineConnectorsList = [];
		const storageNodes = this.store.selectSnapshot(WorkspaceState).nodes;
		const storageLines = this.store.selectSnapshot(WorkspaceState).lines;
		for (let i = 0; i < storageNodes.length; ++i) {
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

	loadLine(line: lineConnectors) {
		this.data.lineConnectorsList.push({
			start: line.start,
			end: line.end,
			line: line.line
		})
		// this.addStorageLines(line);
	}

	addStorageLines(line: lineConnectors) {
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
	createNode(type: string) {
		const nodeNum = this.data.nodes.length + 1;
		const nodeName = "Component" + (Number(this.data.nodes.length) + 1);
		const nodeType = this.data.type;

		this.data.nodes.push({
			num: nodeNum,
			name: nodeName,
			type: nodeType,
			value: type,
			x: 0,
			y: 0
		});
		this.addNodeToStorage(nodeNum, nodeName, nodeType, type, 0, 0);
	}

	// This adds a new node to the data service "nodes" array. However the type is set to 'functional'
	createFunctionalNode(type: string) {
		const nodeNum = this.data.nodes.length + 1;
		const nodeName = "Functional" + (Number(this.data.nodes.length) + 1);

		this.data.nodes.push({
			num: nodeNum,
			name: nodeName,
			type: "functional",
			value: type,
			x: 0,
			y: 0
		});

		this.addNodeToStorage(nodeNum, nodeName, "functional", type, 0, 0);

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

	clearCanvas() {
		const clearDialog = this.dialog.open(NavbarDialogsComponent);

		clearDialog.afterClosed().subscribe(result => {
			const clearCanvasBoolean = clearDialog.disableClose;

			if (clearCanvasBoolean) {
				this.data.nodes.forEach(element => this.store.dispatch(new RemoveNodeFromStorage(element.name)))
				this.data.lineConnectorsList.forEach(element => this.store.dispatch(new RemoveLineFromStorage(element)))
				this.data.lineConnectorsList.forEach(element => element.line?.remove())

				this.data.nodes.splice(0, this.data.nodes.length)
				this.data.lineConnectorsList.splice(0, this.data.lineConnectorsList.length)

        //new data structure
        this.TFNodeList.forEach(element => this.store.dispatch(new RemoveTFNode(element)))
        this.TFNodeList.splice(0,this.TFNodeList.length)
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
				if (dialogData.projectName != undefined && dialogData.projectDescription != undefined) {
					dataOK = true;
					this.store.dispatch(new AddProjectName(dialogData.projectName));
          this.store.dispatch(new AddProjectDescription(dialogData.projectDescription));
				}
				this.projectDetailsUpdatedSnackbar(dataOK);
			}
		})
	}

	projectDetailsUpdatedSnackbar(dataOk: boolean) {
		let snackBarRef = this.snackBar.openFromComponent(ProjectDetailsUpdatedSnackbarComponent,
			{
				duration: 1000,
				data: dataOk
			})
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

	// Code generation section
	runAndGenerate() {
		const generator : CodeGeneratorService = new CodeGeneratorService();
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

	// tftensor: String[] = ["Constant", "Variable", "Fill", "Linespace", "Zeros", "Ones"];
	// tfoperator: String[] = ["Add", "Add_n", "Divide", "Mod", "Negative", "Reciprocal",
	//     "Scalar Multiplication", "Sigmoid", "Subtract" , "Multiply"];
	createComponent(component: string) {
		let tfnode: TFNode;
		let id: string = Math.random().toString(36).substr(2, 9);
		switch (component) {
			case this.tftensor[0]: {
				tfnode = new TFConstant();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tftensor[1]: {
				tfnode = new TFVariable();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tftensor[2]: {
				tfnode = new TFFill();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tftensor[3]: {
				tfnode = new TFLinespace();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tftensor[4]: {
				tfnode = new TFZeros();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tftensor[5]: {
				tfnode = new TFOnes();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tfoperator[0]: {
				tfnode = new TFAdd();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tfoperator[1]: {
				tfnode = new TFAddN();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tfoperator[2]: {
				tfnode = new TFDivide();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tfoperator[3]: {
				tfnode = new TFMod();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tfoperator[4]: {
				tfnode = new TFNegative();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tfoperator[5]: {
				tfnode = new TFReciprocal();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tfoperator[6]: {
				tfnode = new TFScalarMul();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tfoperator[7]: {
				tfnode = new TFSigmoid();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tfoperator[8]: {
				tfnode = new TFSubtract();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			case this.tfoperator[9]: {
				tfnode = new TFMultiply();
				tfnode.name = component + id;
				tfnode.selector = id;
				this.addNewNode(tfnode);
				break;
			}
			default: {
				//statements;
				console.log("inside")
				break;
			}
		}
		console.log("outside")
	}

}

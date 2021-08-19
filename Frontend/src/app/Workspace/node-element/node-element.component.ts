import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {lineConnectors, NodeData} from "../../node-data";
import interact from "interactjs";
import {FormControl} from '@angular/forms';
import * as LeaderLine from "leader-line-new"
import {DOCUMENT} from "@angular/common";
import {Store} from "@ngxs/store";
import {
  WorkspaceState,
  AddLineConnectorToStorage,
  UpdateNodeInStorage,
  RemoveNodeFromStorage, RemoveLineFromStorage
} from '../../../Storage/workspace'
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
	selector: 'app-node-element',
	templateUrl: './node-element.component.html',
	styleUrls: ['./node-element.component.css']
})

export class NodeElementComponent implements OnInit, AfterViewInit {

	@Input() nodeData: NodeData
	nodesArray = new FormControl();
	private lastSelected: Array<string>;
    public selectOptions: string[];

	constructor(public data: DataService, @Inject(DOCUMENT) private document, private store: Store) {
		this.initialiseDraggable();
	}

	//Initialises the lastSelected string array
	ngOnInit(): void {
    this.lastSelected = [];
    this.selectOptions = [];
        if(this.data.nodes) {
          for (let i = 0; i < this.data.nodes.length; ++i) {
            if (this.data.nodes[i]) {
              if (this.data.nodes[i].name != this.nodeData.name) {
                this.selectOptions.push(this.data.nodes[i].name);
              }
            }
          }
        }
	}

  /*
    - After the View has been initialised, a node's position is updated based on its stored X and Y data
    - When page reloads, nodeData is restored for each specific node
    - All lines are redrawn onto the canvas for each Node
  */
  ngAfterViewInit(){
    if(this.nodeData){
      const node = document.getElementById(this.nodeData.name);

      if(node!=null ) {
        node.style.transform = 'translate(' + Number(this.nodeData.x) + 'px, ' + Number(this.nodeData.y) + 'px)'

        node.setAttribute('data-x',this.nodeData.x.toString());
        node.setAttribute('data-y',this.nodeData.y.toString());
      }

      //All lines saved to the ngxs storage retrieved here
      const storageLines = this.store.selectSnapshot(WorkspaceState).lines;

      //Load all connectors which exist for a Node from the storageLines array
      for(let i=0; i<storageLines.length; ++i) {
        /*
         - If line is the endPoint of a connector then load it
         - Cannot use the start as the end node will/might not have been created yet
          (e.g. Node 1 has been loaded but not Node2, start exists but end doesn't)
        */
        if(storageLines[i].end == this.nodeData.name){
          this.loadLineFromStorageToCanvas(storageLines[i]);
        }
      }
    }
  }

	//Initialise the drag functionality for each node-element.
	initialiseDraggable() {
    const that = this;
    interact('.draggable')
      .draggable({
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: '.workspace-boundary',
            endOnly: true
          })
        ],
        autoScroll: true,
        listeners: {
          move: this.dragListener,
          end(event) {

            const target = event.target;
            const nodeId = event.target.id;
            const node = that.data.nodes.find(element => element.name == nodeId);

            if (node != null) {
              //Update node coordinates
              node.x = target.getAttribute('data-x')
              node.y = target.getAttribute('data-y')

              //Update Node coordinates in the storage
              that.store.dispatch(new UpdateNodeInStorage(node));
            }
          }
        }
      })
  }

  //Called from the initialiseDraggable function and will be called each time a node is moved/dragged
	dragListener(event) {
    const target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
		target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

		// update the position attributes
		target.setAttribute('data-x', x)
		target.setAttribute('data-y', y)
	}

	/*
	 - Saves the lastSelected option from the output List and uses it for creating line links
	 - LeaderLine object created for a visual connection between two nodes
	 - newly created line pushed to the lineConnectorsList so it can be outputted on the canvas
	*/
	linkNodes() {

	  //lastSelected used because simply using data from the nodesArray is not sufficient
    for(let i=0; i<this.nodesArray.value.length; ++i){
      if(this.lastSelected.indexOf(this.nodesArray.value[i]) === -1){
        this.lastSelected.push(this.nodesArray.value[i]);
      }
    }
	  const lineStartName = this.nodeData.name;
	  const lineEndName = this.lastSelected[this.lastSelected.length-1];

	  const lineObj = new LeaderLine(
      this.document.getElementById(lineStartName),
      this.document.getElementById(lineEndName), {
        // size: 6,
        // outlineColor: '#red',
        // outline: true,
        // endPlugOutline: true,
        // dash: true,
        // path: 'arc',
        path: 'grid',
        startPlug: 'disc',
        startSocket: 'auto',
        endSocket: 'auto'
      }
    );

	  const self = lineObj.setOptions;

		this.data.lineConnectorsList.push({
				start: lineStartName,
				end: lineEndName,
				line: lineObj,
			});
		this.addLineToStorage(this.data.lineConnectorsList[this.data.lineConnectorsList.length-1]);
	}

  /*
    - Function loads a line from storage
    - Creates a LeaderLine object using the start and end line strings
    - Then pushes the newly created LeaderLine object to the lineConnectorsList array
    - ToDo: Add comments inside the interface/constructors for Node and LineConnector objects
  */
  loadLineFromStorageToCanvas(line: lineConnectors){

    const lineStartName = line.start;
    const lineEndName = line.end;

    const startDiv = this.document.getElementById(lineStartName);
    const endDiv = this.document.getElementById(lineEndName);

    if(startDiv!=null && endDiv!=null){
      const lineObj = new LeaderLine(
        startDiv,
        endDiv, {
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

      this.data.lineConnectorsList.push({
        start: lineStartName,
        end: lineEndName,
        line: lineObj,
      });

    }
  }

	// Redraw lines for each component on mousemove
	openDeleteDialog(){
	  // const dialog= this.dialog.open(NodeDeleteDialog, {
	  //   data: {nodeData2: this.nodeData}
    // });
    //
    //
	  // dialog.afterClosed().subscribe(result => {
    //   const deleteNodeBoolean = dialog.disableClose;
    //
    //   if(deleteNodeBoolean){
    //     // this.data.nodes.filter(element => element.name == this.nodeData.name);
    //     for(let i=0; i<this.data.nodes.length; ++i){
    //       if(this.data.nodes[i].name == this.nodeData.name){
    //         // delete this.data.nodes[i];
    //         const index: number = this.data.nodes.indexOf(this.nodeData);
    //
    //         if(index!=-1){
    //           this.data.nodes.splice(index,1);
    //         }
    //         //go through line connectors here
    //         while(true){
    //           let line = this.data.lineConnectorsList.find(element => element.end == this.nodeData.name || element.start == this.nodeData.name)
    //           //console.log("Line to be deleted: " + JSON.stringify(line));
    //           if(line != undefined) {
    //             this.store.dispatch((new RemoveLineFromStorage(line)))
    //             console.log(line)
    //             line.line?.remove();
    //             this.data.lineConnectorsList.splice(this.data.lineConnectorsList.indexOf(line),1)
    //           }else break;
    //         }
    //         //console.log(this.data.lineConnectorsList)
    //         this.store.dispatch(new RemoveNodeFromStorage(this.nodeData.name))
    //       }
    //     }
    //
    //   }
    // })
  }

	updateSelectedOptions(){
    this.selectOptions = [];
    for(let i=0; i<this.data.nodes.length;++i){
      if(this.data.nodes[i].name != this.nodeData.name){
        this.selectOptions.push(this.data.nodes[i].name);
      }
    }
  }

	// Redraw lines for each component.
	reload() {
		if (this.data?.lineConnectorsList != null) {
			if (this.data.lineConnectorsList.length > 0) {
				for (let i = 0; i < this.data.lineConnectorsList.length; i++) {

					const start = this.data.lineConnectorsList[i].start;
					let end = this.data.lineConnectorsList[i].end;

          if(this.document.getElementById(start) && this.document.getElementById(end)){

            this.data.lineConnectorsList[i].line?.remove();

            this.data.lineConnectorsList[i].line = new LeaderLine(
              this.document.getElementById(start),
              this.document.getElementById(end), {
                // size: 6,
                // outlineColor: '#red',
                // outline: true,
                // endPlugOutline: true,
                // dash: true,
                // path: 'arc',
                path: 'grid',
                startPlug: 'disc',
                startSocket: 'auto',
                endSocket: 'auto'
              }
            );
          }
				}
			}
		}
	}

	addLineToStorage(line){
    this.store.dispatch(new AddLineConnectorToStorage(line));
  }
}

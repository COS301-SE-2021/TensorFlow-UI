import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import * as LeaderLine from "leader-line-new";
import {FormControl} from "@angular/forms";
import {
  AddLineConnectorToStorage, AddRootNode,
  RemoveLineConnectionOne, RemoveLineConnectionTwo,
  UpdateNodeInStorage, UpdateTFNode,
  WorkspaceState
} from "../../../Storage/workspace";
import {TFNode} from "../../tf";
import {DataService} from "../../data.service";
import {DOCUMENT} from "@angular/common";
import {Store} from "@ngxs/store";
import interact from "interactjs";

@Component({
  selector: 'app-rootnode',
  templateUrl: './rootnode.component.html',
  styleUrls: ['./rootnode.component.css']
})
export class RootnodeComponent implements OnInit, AfterViewInit {
  nodes: TFNode[];
  selectedNode = new FormControl();

  @Input() _root: TFNode;

  constructor(public data: DataService, @Inject(DOCUMENT) private document, private store: Store) {
    this.nodes = this.store.selectSnapshot(WorkspaceState).TFNode;
    this.initialiseDraggable();
    this.store.dispatch(new AddRootNode(this._root))
  }

  ngOnInit(): void {
    let temp = this.store.selectSnapshot(WorkspaceState).rootNode;
    console.log(temp)
    if(temp != null) {
      this._root = temp
      console.log("rootNode: "+ JSON.stringify(temp))
    }
    else this.store.dispatch(new AddRootNode(this._root))
  }

  ngAfterViewInit() {
    if(this._root){
      if (this._root.name != undefined) {
        const node = document.getElementById(this._root.name);

        if (node != null) {
          node.style.transform = 'translate(' + Number(this._root.positionX) + 'px, ' + Number(this._root.positionY) + 'px)'

          node.setAttribute('data-x', this._root.positionX.toString());
          node.setAttribute('data-y', this._root.positionY.toString());
        }
      }
    }
  }

  checkChild(selectedNode: FormControl) {
      if (selectedNode.toString() != this._root.childOne?.name) {
        const templine: LeaderLine = this.store.selectSnapshot(WorkspaceState).lines.find(element => element.start == this._root.name || element.end == this._root.name);
        this.store.dispatch(new RemoveLineConnectionOne(this._root));
        templine != undefined ? templine["line"].remove() : "";
        this._root.childOne = this.nodes.find(element => element.name == selectedNode.toString());
        this.store.dispatch(new AddRootNode(this._root));

    }
  }

  linkNodes(selectedNode: FormControl) {
    if (this._root?.name != undefined) {
      const lineStartName = this._root.name.toString();
      const lineEndName = selectedNode.toString();
      const lineObj = new LeaderLine(
          this.document.getElementById(lineStartName),
          this.document.getElementById(lineEndName), {
            startSocket: 'auto',
            endSocket: 'auto'
          }
      );
      this.checkChild(selectedNode);

      this.store.dispatch(new AddLineConnectorToStorage({
        start: lineStartName,
        end: lineEndName,
        line: lineObj
      }))

    }
  }
  // Redraw lines for each component.
  reload() {
    this.nodes = this.store.selectSnapshot(WorkspaceState).TFNode;

    if (this.store.select(WorkspaceState) != null && this.store.selectSnapshot(WorkspaceState).lines.length > 0) {
      for (let i = 0; i < this.store.selectSnapshot(WorkspaceState).lines.length; i++) {

        let l: LeaderLine;
        l = this.store.selectSnapshot(WorkspaceState).lines[i]["line"];
        l?.position();
      }
    }
  }
  initialiseDraggable() {
    const that = this;
    interact('.draggableNode')
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
              console.log(event.target);

              const target = event.target;
              const nodeId = event.target.id;
              const node = that.store.selectSnapshot(WorkspaceState).rootNode;

              if(node!=null){
                //Update node coordinates
                node.positionX = target.getAttribute('data-x')
                node.positionY = target.getAttribute('data-y')

                //Update Node coordinates in the storage
                that.store.dispatch(new AddRootNode(node));
              }
            }

          }
        });
    //this.store.dispatch(new AddRootNode(this._root))
  }

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

}

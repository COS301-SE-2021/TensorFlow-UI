import {Component, Inject, Input, OnInit} from '@angular/core';
import * as LeaderLine from "leader-line-new";
import {FormControl} from "@angular/forms";
import {AddLineConnectorToStorage, UpdateNodeInStorage, WorkspaceState} from "../../../Storage/workspace";
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
export class RootnodeComponent implements OnInit {
  nodes: TFNode[];
  selectedNode = new FormControl();

  @Input() _root: TFNode;

  constructor(public data: DataService, @Inject(DOCUMENT) private document, private store: Store) {
    this.nodes = this.store.selectSnapshot(WorkspaceState).TFNode;
    this.initialiseDraggable();
  }

  ngOnInit(): void {
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

      this.store.dispatch(new AddLineConnectorToStorage({
        start: lineStartName,
        end: lineEndName,
        line: lineObj
      }))

    }
  }
  // Redraw lines for each component.
  reload() {

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
              const node = that.data.nodes.find(element => element.name == nodeId);

              if(node!=null){
                //Update node coordinates
                node.x = target.getAttribute('data-x')
                node.y = target.getAttribute('data-y')

                //Update Node coordinates in the storage
                that.store.dispatch(new UpdateNodeInStorage(node));
              }
            }
          }
        });
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

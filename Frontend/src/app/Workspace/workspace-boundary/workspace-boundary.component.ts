import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";
import interact from 'interactjs';

@Component({
  selector: 'app-workspace-boundary',
  templateUrl: './workspace-boundary.component.html',
  styleUrls: ['./workspace-boundary.component.css']
})
export class WorkspaceBoundaryComponent implements OnInit, AfterContentInit {

  createNodeBool: boolean;
  createFormBool = false;

  constructor(public data: DataService) { }

  ngAfterContentInit(): void {
        throw new Error('Method not implemented.');
    }

  ngOnInit(): void {
    this.data.createNodeBoolean.subscribe(nodeBool => this.createNodeBool = nodeBool);
    this.data.createFormBoolean.subscribe(formBool => this.createFormBool = formBool);
    this.data.nodes = [];
    // this.initWorkspace();
  }

  addNode() {
    // this.data.changeCreateFormBoolean(false);
    this.data.changeCreateNodeBoolean(false);
    this.data.nodes.push({
      num: this.data.nodes.length + 1,
      name: this.data.name,
      type: this.data.type
    });
  }
  //
  // initWorkspace(){
  //   interact('.draggable')
  //       .draggable({
  //         inertia: true,
  //         modifiers: [
  //           interact.modifiers.restrictRect({
  //             restriction: 'parent',
  //             endOnly: true
  //           })
  //         ],
  //         autoScroll: true,
  //         listeners: {
  //           move: this.dragListener,
  //           end(event){
  //
  //           }
  //         }
  //       })
  // }
  //
  // dragListener (event) {
  //   var target = event.target
  //   // keep the dragged position in the data-x/data-y attributes
  //   var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  //   var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
  //
  //   // translate the element
  //   target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'
  //
  //   // update the position attributes
  //   target.setAttribute('data-x', x)
  //   target.setAttribute('data-y', y)
  //
  // }
}

import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";
import interact from "interactjs";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-node-element',
  templateUrl: './node-element.component.html',
  styleUrls: ['./node-element.component.css']
})
export class NodeElementComponent implements OnInit {

  @Input() nodeData: NodeData
  nodesArray = new FormControl();
  nodesArrayList: string[] = [];


  constructor(public data: DataService) {
      // this.data.nodes = data.nodes;
  }

  ngOnInit(): void {
    this.initialiseCanvas();
    console.log(this.nodeData);
  }

  initialiseCanvas(){
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
            end(event){
            }
          }
        })
  }

  dragListener (event) {
    let target = event.target

    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

    // update the position attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
}

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
  }

  initialiseCanvas(){
    interact('.draggable')
        .draggable({
          inertia: true,
          modifiers: [
            interact.modifiers.restrictRect({
              restriction: 'parent',
              endOnly: true
            })
          ],
          autoScroll: true,
          listeners: {
            move: this.dragListener,
            end(event){
                console.log("x = " + (parseFloat(event.target.getAttribute('data-x')) || 0) + event.dx)
                // console.log("x = " + event.target.getAttribute('data-x'))
            }
          }
        })
  }

  dragListener (event) {
    let target = event.target

    // keep the dragged position in the data-x/data-y attributes
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx

    // console.log(typeof target.getAttribute('data-x'))
    // console.log()

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // console.log("x" + x)
    // console.log("y" + y)
    // update the position attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }
}

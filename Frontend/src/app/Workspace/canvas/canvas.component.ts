import {Component, EventEmitter, OnInit, AfterViewInit} from '@angular/core';
import * as d3 from 'd3';
import interact from 'interactjs'

import {Node} from "../../Node/node.component";
import {NodeData} from "../../node-data";

interface NodeType{

}

interface Coordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit,AfterViewInit{

  private canvas: any;
  private nodes: NodeData[];
  private nodesContainer;
  private nodesCounter: number=0;

  constructor() {

  }

  ngOnInit(): void {
    this.canvas = d3.select('div#d3Canvas').
    style("background-color", "white").
    style("width", "100%").
    style("height", "100%");

    this.initialiseCanvas();
  }

  ngAfterViewInit(){

    const draggableNode = this.canvas.selectAll("node")
      .join("node")
      .attr("x", d =>d.x)
      .attr("y", d =>d.y)
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .call(d3.drag()
        .on("start", this.dragStarted)
        .on("drag", this.dragged)
        .on("end", this.dragEnded)
      );
  }

  addNodeToCanvas(){
    var canvasContainer = document.getElementById("nodeShapeContainer");
    console.log(canvasContainer) ;

    var node = document.createElement('div');
    node.classList.add('draggable');
    node.style.height = "3rem";
    node.style.width = "9%";
    node.style.backgroundColor = "#29e";
    node.style.borderRadius = "0.75em";
    node.style.touchAction = "none";
    node.style.transform = "translate(0px,0px)";

    console.log(node);

    // @ts-ignore
    canvasContainer.appendChild(node);

    // this.initialiseCanvas();
    ++this.nodesCounter;
  }

  dragStarted(event):void {
    // const test = d3.select(this);
    // d3.select(this).raise().classed("active", true);
    //
    // const current = d3.select(this)
    // const xVal = +current.attr("x");
    // const yVal = +current.attr("y");
    //
    // deltaX = xVal - event.x;
    // deltaY = yVal - event.y;
  }

  dragged(node):void{
    console.log("HERE_DRAGGED");
    // d.xVal = x.invert(d3.event.x);
    // d.yVal = y.invert(d3.event.y);
    // d3.select(this).select("rect")
    //   .attr("x", x(d.xVal))
    //   .attr("y", y(d.yVal))
    //   .attr("transform","translate("+d.xVal+","+d.yVal+")")
    // console.log(d);
  }

  dragEnded(node): void{
    console.log("HERE_END");
    // d3.select(this).raise().classed("active",false);
    //d3.select('rect#no-drag').on('mousedown.drag',null);
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

          }
        }
      })
  }

  dragListener (event) {
      var target = event.target
      // keep the dragged position in the data-x/data-y attributes
      var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
      var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

      // translate the element
      target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

      // update the position attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)

  }
}

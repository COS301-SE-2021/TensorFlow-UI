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
  private x1:number;
  private x2:number;
  private y1:number;
  private y2:number;

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

    ++this.nodesCounter;
  }

  onMousemove(event){
    var bound = event.target.getBoundingClientRect();
    console.log(bound);
  }

  linkNodes(){
    const nodesContainer = document.getElementById("nodeShapeContainer");

    if(this.nodesCounter>0){
        // @ts-ignore
      const localNode = document.getElementsByClassName("node");

      // @ts-ignore
      this.x1 = +localNode[localNode.length-2].getAttribute("x");
      // @ts-ignore
      this.y1 = +localNode[localNode.length-2].getAttribute("y");
      // @ts-ignore
      this.x2= +localNode[localNode.length-1].getAttribute("x");
      // @ts-ignore
      this.y2 = +localNode[localNode.length-1].getAttribute("y");

      const svg = d3.select("#mainSvg");

      svg.append("line")
        .style("stroke", "black")
        .attr("class", "mainLine")
        .attr("x1",this.x1)
        .attr("x2",this.x2)
        .attr("y1",this.y1)
        .attr("y2",this.y2)
    }

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

  clearCanvas(){

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
            var innerText = event.target.querySelector('p')

            innerText && (innerText.textContent =
              'moved a distance of ' +
              (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                Math.pow(event.pageY - event.y0, 2) | 0))
                .toFixed(2) + 'px')
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

      // update the posiion attributes
      target.setAttribute('data-x', x)
      target.setAttribute('data-y', y)

  }

  handleMouseOver(mouseEvent){
    const node = d3.select(mouseEvent.target);
    node.attr("fill", "#3e6873");
  }

  handleMouseOut(mouseEvent){
    const node = d3.select(mouseEvent.target);
    node.attr("fill", "#69a3b2");
  }

}

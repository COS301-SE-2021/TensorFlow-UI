import {Component, EventEmitter, OnInit, AfterViewInit} from '@angular/core';
import * as d3 from 'd3';

import {Node} from "../../Node/node.component";
import {Link} from "../link/link.component";
import {NodeData} from "../../node-data";


interface LineData{
  x: number;
  y: number;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit,AfterViewInit{

  private canvas: any;
  private nodes: NodeData[];
  private dragBehaviour = d3.drag().on("start", this.dragStarted).on("drag", this.dragged);

  constructor() {
  }

  ngOnInit(): void {
    this.canvas = d3.select('div#d3Canvas').
    style("background-color", "white").
    style("width", "100%").
    style("height", "100%");

    this.addNodeToCanvas();
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

    const nodeShape = d3.select("#nodeShapeContainer").append("svg").attr("width", 300).attr("height", 400);

    nodeShape.append('rect')
      .attr("id", "node")
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', "25%")
      .attr('height', "35%")
      .attr('stroke', 'red')
      .attr('fill', '#69a3b2');

    const dragHandler =
      d3.drag()
        .on("drag", function (event){
          console.log(d3.select(this));
          console.log(event);
          // @ts-ignore
          // @ts-ignore
          d3.select(this)
            .attr("x",event.dx)
            .attr("y", event.dy);
        })



    dragHandler(nodeShape.selectAll("rect"));

    const node = document.getElementById("node");
    const nodeContainer = document.getElementById("nodeShapeContainer");

    console.log(nodeContainer);

  }

  dragStarted(node):void {
    console.log("HERE_START");
    var test2 =d3.select("div.node");
    console.log(test2);
    d3.select("div.node").raise().attr("active", "true");
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

}

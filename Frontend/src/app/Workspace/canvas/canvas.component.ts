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

    const nodeShape = d3.select("#nodeShapeContainer").append("svg").attr("width", 180).attr("height", 220);

    nodeShape.append('rect')
      .attr("id", "node")
      .attr('x', 10)
      .attr('y', 10)
      .attr('width', 165)
      .attr('height', 200)
      .attr('stroke', 'black')
      .attr('fill', '#69a3b2')
      .style("font-size", 19)

    const node = document.getElementById("node");
    const nodeContainer = document.getElementById("nodeShapeContainer");

    const svg = d3.select("#text").append("svg").attr("width", 180).attr("height", 100);

    svg.append('text')
      .attr('x', 15)
      .attr('y', 35)
      .style("font-size", 19)
      .text("Hello world")

    // const nodeDataSvg = d3.select("#nodeData").append("svg").attr("width", 100).attr("height", 100);

    console.log(nodeContainer);

    // this.canvas.append("div")
    //   .attr("class", "node")
    //   .style("background-color", "red")
    //   .style("cursor", "pointer")
    //   .attr("draggable", "true")
    //   .style("width", "100px")
    //   .style("height", "100px")
    //   .style("border","2px solid black")
    //   .style("display", "inline-block");
  }

  dragStarted(d):void {
    console.log("HERE_START");
    var test2 =d3.select("div.node");
    console.log(test2);
    d3.select("div.node").raise().attr("active", "true");
  }

  dragged(d):void{
    console.log("HERE_DRAGGED");
    // d.xVal = x.invert(d3.event.x);
    // d.yVal = y.invert(d3.event.y);
    // d3.select(this).select("rect")
    //   .attr("x", x(d.xVal))
    //   .attr("y", y(d.yVal))
    //   .attr("transform","translate("+d.xVal+","+d.yVal+")")
    // console.log(d);
  }

  dragEnded(d): void{
    console.log("HERE_END");
    // d3.select(this).raise().classed("active",false);
    //d3.select('rect#no-drag').on('mousedown.drag',null);
  }

}

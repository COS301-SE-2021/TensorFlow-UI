import {Component, EventEmitter, OnInit, AfterViewInit} from '@angular/core';
import * as d3 from 'd3';

import {Node} from "../../Node/node.component";
import {Link} from "../link/link.component";
import {NodeData} from "../../node-data";

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

    this.nodesContainer = d3.select("#nodeShapeContainer").append("svg").attr("id","mainSvg").attr("width", "100%").attr("height", "100%").style("border","2px solid black");

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

    this.nodesContainer.append('rect')
      .attr("class", "node")
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', "70px")
      .attr('height', "55px")
      // .attr("d", symbol.type(nodeShape=>nodeShape))
      // .attr("transform", (shape,i)=>"translate("+x(i)+",-40)")
      .attr('fill', '#69a3b2')
      .on("mouseover", this.handleMouseOver)
      .on("mouseout", this.handleMouseOut)

    // .on("mouseover", function (d) {d3.select(this).style("cursor", "move");});

    var deltaX, deltaY;

    const dragHandler =
      d3.drag()
        .on("start", function (event){

          const test = d3.select(this);
          d3.select(this).raise().classed("active", true);

          const current = d3.select(this)
          const xVal = +current.attr("x");
          const yVal = +current.attr("y");

          deltaX = xVal - event.x;
          deltaY = yVal - event.y;
        })
        .on("drag", function (event){

          d3.select(this)
            .attr("x", event.x + deltaX)
            .attr("y", event.y + deltaY);

        })
        .on("end", function (event){

          const newLocation = d3.select(this)

          newLocation.attr("x",event.x);
          newLocation.attr("y",event.y);

        })

    dragHandler(this.nodesContainer.selectAll("rect"));

    ++this.nodesCounter;
  }

  linkNodes(){
    const nodesContainer = document.getElementById("nodeShapeContainer");
    console.log(this.nodesCounter);

    if(this.nodesCounter>1){
        // @ts-ignore
      const localNode = document.getElementsByClassName("node");
      console.log(localNode);

      console.log(localNode[0])
      // @ts-ignore
      var x1: number = +localNode[0].getAttribute("x");
      // @ts-ignore
      var x2:number = +localNode[0].getAttribute("y");
      // @ts-ignore
      var y1: number = +localNode[1].getAttribute("x");
      // @ts-ignore
      var y2:number = +localNode[1].getAttribute("y");

      const svg = d3.select("#mainSvg");

      svg.append("line")
        .style("stroke", "black")
        .attr("x1",x1)
        .attr("x2",x2)
        .attr("y1",y1)
        .attr("y2",y2)
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

  handleMouseOver(mouseEvent){
    const node = d3.select(mouseEvent.target);
    node.attr("fill", "#3e6873");
  }

  handleMouseOut(mouseEvent){
    const node = d3.select(mouseEvent.target);
    node.attr("fill", "#69a3b2");
  }

}

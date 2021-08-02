import {Component, EventEmitter, OnInit, AfterViewInit} from '@angular/core';
import * as d3 from 'd3';

import {Node} from "../../Node/node.component";
import {Link} from "../link/link.component";
import {NodeData} from "../../node-data";
import {getMutableClientRect} from "@angular/cdk/drag-drop/client-rect";

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
  private coordinates: Coordinates;

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
      // .attr('stroke', '#000')
      // .attr('stoke-width', "2px")
      // .on("mouseover", this.handleMouseOver)
      // .on("mouseout", this.handleMouseOut)
      // .append("text")

    //this.nodes.push();

    this.nodesContainer.append('path')
      .datum()

    this.linkNodes();
    var deltaX, deltaY;

    const that = this;

    const dragHandler =
      d3.drag()
        .on("start", function (event){

          const test = d3.select(this).raise().classed("active", true);
          // console.log(test);
          // console.log(d3.select(this).node());
          // console.log(d3.select(this).nodes());

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

          //node connectors
          const line = document.getElementsByTagName("line");

          if(line.length>0){
            let line2 = line[0];

            const localNode = document.getElementsByClassName("node");

            //@ts-ignore
            that.x1 = +localNode[localNode.length-2].getAttribute("x");
            // @ts-ignore
            that.y1 = +localNode[localNode.length-2].getAttribute("y");
            // @ts-ignore
            that.x2= +localNode[localNode.length-1].getAttribute("x");
            // @ts-ignore
            that.y2 = +localNode[localNode.length-1].getAttribute("y");

            const linee = document.getElementsByClassName("mainLine")[0];

            linee.setAttribute("x1",String(that.x1));
            linee.setAttribute("x2",String(that.x2));
            linee.setAttribute("y1",String(that.y1));
            linee.setAttribute("y2",String(that.y2));
          }
        })
        .on("end", function (event)  {

          d3.select(this).raise().classed("active", false);
          const newLocation = d3.select(this);

          newLocation.attr("x",event.x+deltaX);
          newLocation.attr("y",event.y+deltaY);

          const line = document.getElementsByTagName("line");

          if(line.length>0){
            let line2 = line[0];

            const localNode = document.getElementsByClassName("node");

            //@ts-ignore
            that.x1 = +localNode[localNode.length-2].getAttribute("x");
            // @ts-ignore
            that.y1 = +localNode[localNode.length-2].getAttribute("y");
            // @ts-ignore
            that.x2= +localNode[localNode.length-1].getAttribute("x");
            // @ts-ignore
            that.y2 = +localNode[localNode.length-1].getAttribute("y");

            const linee = document.getElementsByClassName("mainLine")[0];

            linee.setAttribute("x1",String(that.x1));
            linee.setAttribute("x2",String(that.x2));
            linee.setAttribute("y1",String(that.y1));
            linee.setAttribute("y2",String(that.y2));
          }
        })


    dragHandler(this.nodesContainer.selectAll("rect"));

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

  handleMouseOver(mouseEvent){
    const node = d3.select(mouseEvent.target);
    node.attr("fill", "#3e6873");
  }

  handleMouseOut(mouseEvent){
    const node = d3.select(mouseEvent.target);
    node.attr("fill", "#69a3b2");
  }

}

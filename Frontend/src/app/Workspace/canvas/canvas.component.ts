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

    const nodeShape = d3.select("#nodeShapeContainer").append("svg").attr("width", "100%").attr("height", 400);

    nodeShape.append('rect')
      .attr("id", "node")
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', "25%")
      .attr('height', "35%")
      // .attr("d", symbol.type(nodeShape=>nodeShape))
      // .attr("transform", (shape,i)=>"translate("+x(i)+",-40)")
      .attr('fill', '#69a3b2');

    var deltaX, deltaY;

    const dragHandler =
      d3.drag()
        .on("start", function (event){
          d3.select(this).raise();

          const current = d3.select(this)
          const xVal = +current.attr("x");
          const yVal = +current.attr("y");

          deltaX = xVal - event.x;
          deltaY = yVal - event.y;
        })
        .on("drag", function (event){

          const dx = event.x + deltaX;
          const dy = event.y + deltaY;

          d3.select(this)
            .attr("transform", shape => "translate("+dx+","+dy+")")

          const newLocation = d3.select(this)

          const newCord = getTranslateXY(newLocation.attr("transform"));

          const newX = newCord[0];
          const newY = newCord[1];

          newLocation.attr("x",newX);
          newLocation.attr("y",newY);
        })

    dragHandler(nodeShape.selectAll("rect"));

    const node = document.getElementById("node");
    const nodeContainer = document.getElementById("nodeShapeContainer");

    console.log(nodeContainer);

    function getTranslateXY(transform) {
      const startOfX = transform.toString().indexOf("(");
      const endOfX = transform.toString().indexOf(",");

      const startOfY = transform.toString().indexOf(",");
      const endOfY = transform.toString().indexOf(")");

      const x = transform.toString().substring(startOfX+1,endOfX);
      const y = transform.toString().substring(startOfY+1,endOfY);

      return [x,y];
    }

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

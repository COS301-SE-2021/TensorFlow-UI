import {Component, EventEmitter, OnInit, AfterViewInit} from '@angular/core';
import * as d3 from 'd3';
import interact from 'interactjs'
import {NodeData} from "../../node-data";
import {DataService} from "../../data.service";
import {Node} from "../../Node/node.component";
import {NodeElementComponent} from "../node-element/node-element.component";
import { MatFormField} from "@angular/material/form-field";
import {FormControl} from "@angular/forms";

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
  nodesArray = new FormControl();
  nodesArrayList: string[] = [];

  private nodesContainer;
  private nodesCounter: number=0;
  private x1: number=0;
  private x2: number=0;
  private y1: number=0;
  private y2: number=0;
  createNodeBool: boolean;

  constructor(private data : DataService) {
  }

  ngOnInit(): void {
    this.data.createNodeBoolean.subscribe(nodeBool => this.createNodeBool = nodeBool);
    this.data.nodes = [];

    this.canvas = d3.select('div#d3Canvas').
    style("background-color", "white").
    style("width", "100%").
    style("height", "100%");

    this.nodesContainer = d3.select("#canvas")
      .append("svg")
      .attr("id","mainSvg")
      .attr("width", "98%")
      .attr("height", "100rem ")
      .style("border","2px solid black")
      .style("left","1%")
      .style("position", "absolute")

    this.initialiseCanvas();

  }

  ngAfterViewInit() {
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
    var nodes = localStorage.getItem("nodeArray");
    console.log("from LS: " + nodes);
    if(nodes != null) this.data.nodes = JSON.parse(nodes);
    console.log("node array: " + this.data.nodes)
    for(var i = 0; i < this.data.nodes.length; i++){
      this.addNodeToCanvas(true)
    }
  }

  addNodeToCanvas(givenNode: boolean) {
    console.log(this.data.nodes);

    this.data.changeCreateNodeBoolean(false);
    const canvasContainer = document.getElementById("canvas");

    const node = document.createElement('div');
    node.classList.add('draggable');
    node.classList.add('valueNodes');
    node.style.height = "6%";
    node.style.width = "11%";
    node.style.backgroundColor = "#29e";
    node.style.borderRadius = "0.75em";
    node.style.touchAction = "none";
    node.style.transform = "translate(0px,0px)";
    node.style.border = "2px solid black";

    const outputButton = document.getElementsByClassName("NodesArr")[0];

    console.log(outputButton);
    node.appendChild(outputButton);

    const nodeName = "Component " + this.data.nodes.length;

    console.log(nodeName);
    this.nodesArrayList.push(nodeName);


    // if (!givenNode) {
    //   this.data.nodes.push({
    //     num: this.data.nodes.length + 1,
    //     name: nodeName,
    //     type: "valueNode"
    //   });
    // }
    // @ts-ignore
    canvasContainer.appendChild(node);

    ++this.nodesCounter;
  }

  dragListener (event) {
    var target = event.target

    // keep the dragged position in the data-x/data-y attributes
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    const line = document.getElementsByTagName("line");
    if(line.length>0){
      let line2 = line[0];

      const node = document.getElementsByClassName("valueNodes");
      //@ts-ignore
      const x1 = +node[node.length - 2].getAttribute("data-x");
      //@ts-ignore
      const y1 = +node[node.length - 2].getAttribute("data-y");
      //@ts-ignore
      const x2 = +node[node.length - 1].getAttribute("data-x");
      //@ts-ignore
      const y2 = +node[node.length - 1].getAttribute("data-y");

      const linee = document.getElementById("mainLine");

      //@ts-ignore
      linee.setAttribute("x1",String(x1+15));
      //@ts-ignore
      linee.setAttribute("x2",String(x2-6));
      //@ts-ignore
      linee.setAttribute("y1",String(y1+5));
      //@ts-ignore
      linee.setAttribute("y2",String(y2+42));
    }

    // update the position attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }

  linkNodes(){

    const nodesContainer = document.getElementById("canvas");

    if(this.nodesCounter>1) {
      // @ts-ignore
      const localNode = document.getElementsByClassName("valueNodes");

// @ts-ignore
      this.x1 = +localNode[localNode.length-2].getAttribute("data-x");
      // @ts-ignore
      this.y1 = +localNode[localNode.length-2].getAttribute("data-y");
      // @ts-ignore
      this.x2= +localNode[localNode.length-1].getAttribute("data-x");
      // @ts-ignore
      this.y2 = +localNode[localNode.length-1].getAttribute("data-y");

      console.log(this);
      console.log(document.getElementById("canvas"));

      const svg = d3.select("#mainSvg");

      svg.append("svg:defs").append("svg:marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

      svg.append("line")
        .style("stroke", "green")
        .style("stroke-width", "2")
        .style("z-index","1")
        .attr("id", "mainLine")
        .attr('marker-end', 'url(#arrow)')
        .attr("x1",this.x1+15)
        .attr("y1",this.y1+5)
        .attr("x2",this.x2-6)
        .attr("y2",this.y2+48)

      console.log("x1: "+this.x1+", y2: "+this.y1);
      console.log("x2: "+this.x2+", y2: "+this.y2);
      //@ts-ignore
    }
  }

  clearCanvas(){
    const nodes = document.getElementsByClassName("draggable");
  }

  addFuncNode(){
    const canvasContainer = document.getElementById("canvas");

    const node = document.createElement('div');
    node.classList.add('draggable');
    node.classList.add('functionalNode');
    node.style.height = "2.2rem";
    node.style.width = "9%";
    node.style.backgroundColor = "#F2F2F2";
    node.style.borderRadius = "2.3rem";
    node.style.touchAction = "none";
    node.style.transform = "translate(0px,0px)";
    node.style.border = "2px solid black";

    //@ts-ignore
    canvasContainer.appendChild(node);
    console.log(canvasContainer);
  }

  saveNodes(){
    localStorage.setItem("nodeArray",JSON.stringify(this.data.nodes));
  }
}

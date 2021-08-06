import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";
import interact from "interactjs";
import { FormControl } from '@angular/forms';
import * as d3 from 'd3';

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


  /*showEditSection(event,data: NodeData){
    this.data.changeEditNodeView(!this.editNodeSection);
    this.data.currentNode = data; //how to fix this
    //this.data.changeCurrentNode(data);
  }*/

  ngOnInit(): void {
    this.initialiseCanvas();
  }

  initialiseCanvas(){
    const that = this;
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
            move: function dragListener(event){
              let target = event.target

              // keep the dragged position in the data-x/data-y attributes
              const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
              const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

              // translate the element
              target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

              // update the position attributes
              target.setAttribute('data-x', x)
              target.setAttribute('data-y', y)

              const thisNode = that.data.nodes.find(element => element.name === target.id);
              if(thisNode!=undefined){
                thisNode.x = x;
                thisNode.y = y;
              }

              console.log(thisNode);

            },
            end(event){
              //Update nodeData coordinates after drag ends
              const thisNode = that.data.nodes.find(element => element.name === event.target.id);
              if(thisNode!=undefined){
                thisNode.x = event.target.getAttribute('data-x');
                thisNode.y = event.target.getAttribute('data-y');
                console.log("Updated")
                console.log(thisNode);
              }
              var nodes = localStorage.getItem("nodesArray");
              if(nodes != null) {
                var nodesarray = JSON.parse(nodes)
                if (nodesarray != null) {
                  for (var i = 0; i < nodesarray.length; i++) {
                    if(that.nodeData.num == nodesarray[i].num){
                      nodesarray[i] = that;
                    }
                  }
                }
                localStorage.setItem("nodesArray",JSON.stringify(nodesarray))
              }
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

  linkNodes(event){

    for(let i=0; i<event.value.length;++i){
      const targetNodeName = event.value[i].name;
      const targetInArray = this.data.nodes.find(element => element.name === targetNodeName);

      if(targetInArray!=undefined) {
        const sourceX = this.nodeData.x;
        const sourceY = this.nodeData.y;
        const targetX = targetInArray.x;
        const targetY = targetInArray.y;

        this.nodeData.connectors.push({
          x1: sourceX,
          y1: sourceY,
          x2: targetX,
          y2: targetY
        })

        const svg = d3.select("#mainSvg");

        svg.append("svg:defs").append("svg:marker")
          .attr("id", "arrow")
          .attr("viewBox", "0 -5 10 10")
          .attr("markerWidth", 5)
          .attr("markerHeight", 5)
          .attr("orient", "auto")
          .append("svg:path")
          .attr("d", "M0,-5L10,0L0,5");

        console.log("SourceX: "+sourceX)
        console.log("SourceY: "+sourceY)

        svg.append("path")
          .style("stroke", "green")
          .style("stroke-width", "2")
          .style("z-index", "1")
          .attr("id", this.nodeData.name)
          .attr('marker-end', 'url(#arrow)')
          .attr("d","M"+sourceX+" "+sourceY+"L"+targetX+" "+targetY)
          // .attr("x1",  50)
          // .attr("y1", event.dy)
          // .attr("x2", 350)
          // .attr("y2", 150)
      }
    }
  }
}

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
  lineConnectorCount: number=0;

  constructor(public data: DataService) {
  }


  ngOnInit(): void {
    this.initialiseCanvas();
  }

  initialiseCanvas(){
    /*
      To keep the 'this' pointer accessible inside the dragListener and end event functions, 'this' is
      assigned to the variable 'that'

      However 'that' does not hold the accurate pointer to 'this', but rather the pointer to the last
      NodeElementComponent created.So it is only used to have access to the data object, which contains
      the array of all nodes.
    */
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

              //Update the path position as the node moves
              if(thisNode!=undefined){

                  for(let i=0; i<thisNode.connectors.length; ++i){
                    const connector = thisNode.connectors[i];

                    if(thisNode == connector.sourceNode){
                      console.log("I am the source");
                      connector.sourceNode.x = thisNode.x;
                      connector.sourceNode.y = thisNode.y;

                      //Find the actual specific svg line using the class names it has
                      const svgLine = document.getElementsByClassName(connector.sourceNode.name+" "+connector.targetNode.name)[0];

                      svgLine.setAttribute("x1",String(thisNode.x));
                      svgLine.setAttribute("y1",String(thisNode.y));
                    }
                    else if(thisNode == connector.targetNode){
                      console.log("I am the target");

                      connector.targetNode.x = thisNode.x;
                      connector.targetNode.y = thisNode.y;

                      //Find the actual specific svg line using the class names it has
                      const svgLine = document.getElementsByClassName(connector.sourceNode.name+" "+connector.targetNode.name)[0];

                      svgLine.setAttribute("x2",String(thisNode.x + event.target.parentElement.offsetLeft));
                      svgLine.setAttribute("y2",String(thisNode.y + event.target.parentElement.offsetTop));
                    }
                  }

              }
            },
            end(event){
              //Update nodeData coordinates after drag ends
              const thisNode = that.data.nodes.find(element => element.name === event.target.id);
              if(thisNode!=undefined){
                thisNode.x = event.target.getAttribute('data-x');
                thisNode.y = event.target.getAttribute('data-y');
              }
              console.log(event.target);
              console.log(event.target.parentElement.offsetTop);
              console.log(event.target.parentElement.offsetLeft);
              //console.log(event.target.parentElement.parentElement.offsetTop);
              console.log(that.data.nodes)
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

    ++this.lineConnectorCount;
    for (let i = 0; i < event.value.length; ++i) {
      const targetNodeName = event.value[i].name;
      const targetInArray = this.data.nodes.find(element => element.name === targetNodeName);

      if (targetInArray != undefined) {

        let htmlSource = document.getElementById(this.nodeData.name);
        let htmlTarget = document.getElementById(targetInArray.name);

        console.log(htmlSource);
        console.log(htmlTarget);

        if(htmlSource!=null && htmlSource.parentElement!=null &&
          htmlSource.getAttribute('data-x')!=null && htmlSource.getAttribute('data-y') &&
          htmlTarget!=null && htmlTarget.parentElement!=null){

          const sourceX = Number(htmlSource.getAttribute('data-x')) + htmlSource.parentElement.offsetLeft;
          const sourceY = Number(htmlSource.getAttribute('data-y')) + htmlSource.parentElement.offsetTop;
          const targetX = Number(htmlTarget.getAttribute('data-x')) + htmlTarget.parentElement.offsetLeft;
          const targetY = Number(htmlTarget.getAttribute('data-y')) + htmlTarget.parentElement.offsetTop;

          this.nodeData.connectors.push({
            id: this.lineConnectorCount,
            x1: sourceX,
            y1: sourceY,
            x2: targetX,
            y2: targetY,
            sourceNode: this.nodeData,
            targetNode: targetInArray
          })

          targetInArray.connectors.push({
            id: this.lineConnectorCount,
            x1: sourceX,
            y1: sourceY,
            x2: targetX,
            y2: targetY,
            sourceNode: this.nodeData,
            targetNode: targetInArray
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

          svg.append("line")
            .style("stroke", "green")
            .style("stroke-width", "2")
            .style("z-index", "1")
            .attr("class", this.nodeData.name + " " + targetInArray.name)
            .attr("id", "line" + this.lineConnectorCount)
            .attr('marker-end', 'url(#arrow)')
            // .attr("d","M"+sourceX+" "+sourceY+"L"+targetX+" "+targetY)
            .attr("x1", sourceX)
            .attr("y1", sourceY)
            .attr("x2", targetX)
            .attr("y2", targetY)
        }
      }
    }
  }
}

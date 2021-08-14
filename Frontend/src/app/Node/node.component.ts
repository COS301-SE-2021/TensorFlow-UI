import {Component, Inject, Input, OnInit} from '@angular/core';
import {NodeData} from "../node-data";
import {FormControl} from "@angular/forms";
import {DataService} from "../data.service";
import {DOCUMENT} from "@angular/common";
import {Store} from "@ngxs/store";
import interact from "interactjs";
import {UpdateNodeInStorage} from "../../Storage/workspace/workspace.actions";
import * as LeaderLine from "leader-line-new";
import {
    TFAdd, TFAddN,
    TFConstant, TFDivide,
    TFFill,
    TFLinespace, TFMod,
    TFMultiply, TFNegative,
    TFOnes, TFOperator, TFReciprocal, TFScalarMul,
    TFSigmoid, TFSubtract, TFTensor,
    TFVariable,
    TFZeros
} from "../tf";

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class Node implements OnInit {

    tftensor: String[] = ["Constant", "Variable", "Fill", "Linespace", "Zeros", "Ones"];
    tfoperator: String[] = ["Add", "Add_n", "Divide", "Mod", "Negative", "Reciprocal", "Scalar Multiplication", "Sigmoid", "Subtract" , "Multiply"];

  @Input() nodeData: NodeData
  nodesArray = new FormControl();

  constructor(public data: DataService, @Inject(DOCUMENT) private document, private store: Store) {
    this.initialiseDraggable();
  }

  ngOnInit(): void {
  }

  //Initialise the drag functionality for each node-element.
  initialiseDraggable() {
    const that = this;
    interact('.draggableNode')
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
            move: this.dragListener,
            end(event) {
              console.log(event.target);

              const target = event.target;
              const nodeId = event.target.id;
              const node = that.data.nodes.find(element => element.name == nodeId);

              if(node!=null){
                //Update node coordinates
                node.x = target.getAttribute('data-x')
                node.y = target.getAttribute('data-y')

                //Update Node coordinates in the storage
                that.store.dispatch(new UpdateNodeInStorage(node));
              }
            }
          }
        });
  }

  dragListener(event) {
    const target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the position attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)

  }

  // Initial linking between two node elements.
  linkNodes() {
    let otherNode = this.nodesArray.value[this.nodesArray.value.length - 1];
    const lineStartName = this.nodeData.name;
    const lineEndName = otherNode.name.toString();

    const lineObj = new LeaderLine(
        this.document.getElementById(this.nodeData.name),
        this.document.getElementById(this.nodesArray.value[this.nodesArray.value.length - 1].name.toString()), {
          size: 6,
          outlineColor: '#red',
          outline: true,
          endPlugOutline: true,
          dash: true,
          path: 'arc',
          startSocket: 'auto',
          endSocket: 'auto'
        }
    );

    this.data.lineConnectorsList.push({
          start: lineStartName,
          end: lineEndName,
          line: lineObj,
        }
    );

    //Setting the children of the newly connected nodes
    let node = this.data.TFOperator.find(function (node) {
      if (node.name == lineStartName) {
        return this;
      }
    })
    console.log("Node found from array: " + JSON.stringify(node))
    if (otherNode.childOne == undefined) {
      otherNode.childOne = node
    }else{
      otherNode.childTwo = node
    }
  }

  // Redraw lines for each component.
  reload() {
    if (this.data?.lineConnectorsList != null) {
      if (this.data.lineConnectorsList.length > 0) {
        for (let i = 0; i < this.data.lineConnectorsList.length; i++) {

          const start = this.data.lineConnectorsList[i].start;
          let end = this.data.lineConnectorsList[i].end;
          // @ts-ignore
          this.data.lineConnectorsList[i].line.remove();
          this.data.lineConnectorsList[i].line = new LeaderLine(
              this.document.getElementById(start),
              this.document.getElementById(end), {
                size: 6,
                outlineColor: '#red',
                outline: true,
                endPlugOutline: true,
                dash: true,
                path: 'arc',
                startSocket: 'auto',
                endSocket: 'auto'
              }

          );

        }
      }
    }
  }

    // tftensor: String[] = ["Constant", "Variable", "Fill", "Linespace", "Zeros", "Ones"];
    // tfoperator: String[] = ["Add", "Add_n", "Divide", "Mod", "Negative", "Reciprocal",
    //     "Scalar Multiplication", "Sigmoid", "Subtract" , "Multiply"];
    createComponent(component: String) {
        let tftensor: TFTensor;
        let tfoperator: TFOperator;
        switch (component) {
            case this.tftensor[0]: {
                tftensor = new TFConstant();
                tftensor.name = "TFConstant";
                this.data.TFTensors.push(tftensor);
                console.log("new TFConstant()");
                break;
            }
            case this.tftensor[1]: {
                tftensor = new TFVariable();
                tftensor.name = "TFVariable";
                this.data.TFTensors.push(tftensor);
                console.log("TFVariable()");
                break;
            }
            case this.tftensor[2]: {
                tftensor = new TFFill();
                tftensor.name = "TFFill";
                this.data.TFTensors.push(tftensor);
                console.log("TFFill()");
                break;
            }
            case this.tftensor[3]: {
                tftensor = new TFLinespace();
                tftensor.name = "TFLinespace";
                this.data.TFTensors.push(tftensor);
                console.log("TFLinespace()");
                break;
            }
            case this.tftensor[4]: {
                tftensor = new TFZeros();
                this.data.TFTensors.push(tftensor);
                // this.tftensors[0]
                console.log("new TFZeros()");
                break;
            }
            case this.tftensor[5]: {
                tftensor = new TFOnes();
                tftensor.name = "TFOnes"
                this.data.TFTensors.push();
                console.log("TFOnes()");
                break;
            }
            case this.tfoperator[0]: {
                tfoperator = new TFAdd();
                tfoperator.name = "TFAdd";
                  this.data.TFOperator.push(tfoperator);
                console.log("TFAdd()");
                break;
            }
            case this.tfoperator[1]: {
                tfoperator = new TFAddN();
                tfoperator.name = "TFAdd_n";
                this.data.TFOperator.push(tfoperator);
                console.log("TFAdd_n()");
                break;
            }
            case this.tfoperator[2]: {
                tfoperator = new TFDivide();
                tfoperator.name = "TFDivide";
                this.data.TFOperator.push(tfoperator);
                console.log("TFDivide()");
                break;
            }
            case this.tfoperator[3]: {
                tfoperator = new TFMod();
                tfoperator.name = "TFMod";
                this.data.TFOperator.push(tfoperator);
                console.log("TFMod()");
                break;
            }
            case this.tfoperator[4]: {
                tfoperator = new TFNegative();
                tfoperator.name = "TFNegative";
                this.data.TFOperator.push(tfoperator);
                console.log("TFNegative()");
                break;
            }
            case this.tfoperator[5]: {
                tfoperator = new TFReciprocal();
                tfoperator.name = "TFReciprocal";
                // this.data.TFOperator.push(tfoperator);
                console.log("TFReciprocal()");
                break;
            }
            case this.tfoperator[6]: {
                tfoperator = new TFScalarMul();
                tfoperator.name = "TFScalarMul";
                this.data.TFOperator.push(tfoperator);
                console.log("TFScalarMul()");
                break;
            }
            case this.tfoperator[7]: {
                tfoperator = new TFSigmoid();
                tfoperator.name = "TFSigmoid";
                this.data.TFOperator.push(tfoperator);
                console.log("TFSigmoid()");
                break;
            }
            case this.tfoperator[8]: {
                tfoperator = new TFSubtract();
                tfoperator.name = "TF";
                this.data.TFOperator.push(tfoperator);
                console.log("TFSubtract()");
                break;
            }
            case this.tfoperator[9]: {
                tfoperator = new TFMultiply();
                tfoperator.name = "TF";
                this.data.TFOperator.push(tfoperator);
                console.log("TFMultiply()");
                break;
            }
            default: {
                //statements;
                break;
            }
        }
    }

}

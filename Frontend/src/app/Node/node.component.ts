import {Component, Inject, Input, OnInit} from '@angular/core';
import {NodeData} from "../node-data";
import {FormControl} from "@angular/forms";
import {DataService} from "../data.service";
import {DOCUMENT} from "@angular/common";
import {Store} from "@ngxs/store";
import interact from "interactjs";
import {AddTFNode, UpdateNodeInStorage} from "../../Storage/workspace/workspace.actions";
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
  }

  ngOnInit(): void {
  }

  //Initialise the

  // Initial linking between two node elements.

    /*
  linkNodes() {
    let otherNode = this.nodesArray.value[this.nodesArray.value.length - 1];
    const lineStartName = this.nodeData.name;
    const lineEndName = otherNode.name.toString();

    const lineObj = new LeaderLine(
        this.document.getElementById(this.nodeData.name),
        this.document.getElementById(this.nodesArray.value.name.toString()), {
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
    let node = this.data.TFOperator.find(element => element.name == lineStartName);
    console.log("Node found from array: " + JSON.stringify(node))
    if (otherNode.childOne == undefined) {
      otherNode.childOne = node
    }else{
      otherNode.childTwo = node
    }
  }
  */

    // tftensor: String[] = ["Constant", "Variable", "Fill", "Linespace", "Zeros", "Ones"];
    // tfoperator: String[] = ["Add", "Add_n", "Divide", "Mod", "Negative", "Reciprocal",
    //     "Scalar Multiplication", "Sigmoid", "Subtract" , "Multiply"];
    createComponent(component: String) {
        let tftensor: TFTensor;
        let tfoperator: TFOperator;
        let id: string = (this.data.TFTensors.length + this.data.TFOperator.length).toString();
        switch (component) {
            case this.tftensor[0]: {
                tftensor = new TFConstant();
                tftensor.name = "TFConstant" + id;
                this.data.TFTensors.push(tftensor);
                break;
            }
            case this.tftensor[1]: {
                tftensor = new TFVariable();
                tftensor.name = "TFVariable" + id;
                this.data.TFTensors.push(tftensor);
                break;
            }
            case this.tftensor[2]: {
                tftensor = new TFFill();
                tftensor.name = "TFFill" + id;
                this.data.TFTensors.push(tftensor);
                break;
            }
            case this.tftensor[3]: {
                tftensor = new TFLinespace();
                tftensor.name = "TFLinespace" + id;
                this.data.TFTensors.push(tftensor);
                break;
            }
            case this.tftensor[4]: {
                tftensor = new TFZeros();
                tftensor.name = "TFZeros"  + id;
                this.data.TFTensors.push(tftensor);
                // this.tftensors[0]
                break;
            }
            case this.tftensor[5]: {
                tftensor = new TFOnes();
                tftensor.name = "TFOnes" + id;
                this.data.TFTensors.push();
                break;
            }
            case this.tfoperator[0]: {
                tfoperator = new TFAdd();
                tfoperator.name = "TFAdd" + id;
                this.data.TFOperator.push(tfoperator);
                break;
            }
            case this.tfoperator[1]: {
                tfoperator = new TFAddN();
                tfoperator.name = "TFAdd_n" + id;
                this.data.TFOperator.push(tfoperator);
                break;
            }
            case this.tfoperator[2]: {
                tfoperator = new TFDivide();
                tfoperator.name = "TFDivide" + id;
                this.data.TFOperator.push(tfoperator);
                break;
            }
            case this.tfoperator[3]: {
                tfoperator = new TFMod();
                tfoperator.name = "TFMod" + id;
                this.data.TFOperator.push(tfoperator);
                break;
            }
            case this.tfoperator[4]: {
                tfoperator = new TFNegative();
                tfoperator.name = "TFNegative" + id;
                this.data.TFOperator.push(tfoperator);
                break;
            }
            case this.tfoperator[5]: {
                tfoperator = new TFReciprocal();
                tfoperator.name = "TFReciprocal" + id;
                // this.data.TFOperator.push(tfoperator);
                break;
            }
            case this.tfoperator[6]: {
                tfoperator = new TFScalarMul();
                tfoperator.name = "TFScalarMul";
                this.data.TFOperator.push(tfoperator);
                break;
            }
            case this.tfoperator[7]: {
                tfoperator = new TFSigmoid();
                tfoperator.name = "TFSigmoid" + id;
                this.data.TFOperator.push(tfoperator);
                break;
            }
            case this.tfoperator[8]: {
                tfoperator = new TFSubtract();
                tfoperator.name = "TF" + id;
                this.data.TFOperator.push(tfoperator);
                break;
            }
            case this.tfoperator[9]: {
                tfoperator = new TFMultiply();
                tfoperator.name = "TF" + id;
                this.data.TFOperator.push(tfoperator);
                break;
            }
            default: {
                //statements;
                break;
            }
        }
    }

}

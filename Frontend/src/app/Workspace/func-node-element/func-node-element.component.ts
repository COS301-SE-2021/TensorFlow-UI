import { Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";

@Component({
  selector: 'app-func-node-element',
  templateUrl: './func-node-element.component.html',
  styleUrls: ['./func-node-element.component.css']
})
export class FuncNodeElementComponent implements OnInit {

  constructor(public data: DataService) { }

  ngOnInit(): void {
  }

  createFunctionalNode(){
    const nodeName = "Functional" + (Number(this.data.nodes.length)+1);

    this.data.nodes.push({
      num: this.data.nodes.length + 1,
      name: nodeName,
      type: "functional",
      connectors: [],
      x: 0,
      y: 0
    });
  }

}

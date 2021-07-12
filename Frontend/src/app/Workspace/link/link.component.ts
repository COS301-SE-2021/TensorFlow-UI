import { Component, OnInit } from '@angular/core';
import {NodeData} from "../../node-data";
import { Node} from "../../Node/node.component"

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class Link implements OnInit{

  index?: number;

  source: Node | string | number;
  target: Node | string | number;

  ngOnInit() {
  }

  constructor() {

  }

}

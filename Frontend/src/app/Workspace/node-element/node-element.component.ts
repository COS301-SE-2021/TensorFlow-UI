import { Component, OnInit } from '@angular/core';
import {Node} from "../../Node/node";

@Component({
  selector: 'app-node-element',
  templateUrl: './node-element.component.html',
  styleUrls: ['./node-element.component.css']
})
export class NodeElementComponent implements OnInit {

  constructor() {
    console.log(Node.name);
  }

  ngOnInit(): void {
  }
}

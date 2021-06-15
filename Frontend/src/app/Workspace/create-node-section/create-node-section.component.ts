import { Component, OnInit } from '@angular/core';
import {Node} from "../../Node/node";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-create-node-section',
  templateUrl: './create-node-section.component.html',
  styleUrls: ['./create-node-section.component.css']
})
export class CreateNodeSectionComponent implements OnInit { //HeroFormComponent

  constructor() { }

  ngOnInit(): void {
  }

  nodeName = new FormControl('');
  nodeType = new FormControl('');

  nodeTypes = ['Array','Boolean','Integer', 'String', 'Void'];

  model = new Node("testFunction","testType",null,null,"1");

  submitted = false;

  newNode(){
    this.model = new Node('','',null,null,'');
  }

  onSubmit() {
    this.submitted = true;
  }
}

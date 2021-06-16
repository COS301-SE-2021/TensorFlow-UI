import { Component, OnInit } from '@angular/core';
import {Node} from "../../Node/node";
import {Output,EventEmitter} from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-node-section',
  templateUrl: './create-node-section.component.html',
  styleUrls: ['./create-node-section.component.css']
})
export class CreateNodeSectionComponent implements OnInit { //HeroFormComponent

  constructor() { }

  items:Node;

  nodeName = new FormControl('');
  nodeType = new FormControl('');

  nodeTypes = ['Array','Boolean','Integer', 'String', 'Void'];
  model = new Node("testFunction","testType",null,null,"1");

  submitted = false;
  nodeCreated = false;

  @Output()  newItemEvent = new EventEmitter<string>();

  addNewItem(value:Node|any){
      this.items = value;
  }

  ngOnInit(): void {
  }

  onClickSubmit(data:any) {
    this.submitted = true;
      if(this.nodeName.value != "" && this.nodeType.value != ""){
        this.nodeCreated = true;
        this.model.name = this.nodeName.value;
        this.model.nodeType = this.nodeType.value;
        //this.addNewItem(new Node(this.model.name,this.model.nodeType,null,null,""));
        //this.newItemEvent.emit(this.nodeForm);
      }
  }
}

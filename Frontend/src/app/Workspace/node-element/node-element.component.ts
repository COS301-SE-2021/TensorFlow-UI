import {Component, Input, OnInit} from '@angular/core';
import {Node} from "../../Node/node";
import {DataService} from "../../data.service";
import {NodeData} from "../../node-data";
import {AppModule} from "../../app.module";
import {AppComponent} from "../../app.component";
import { ngstorage } from 'ngstorage';

@Component({
  selector: 'app-node-element',
  templateUrl: './node-element.component.html',
  styleUrls: ['./node-element.component.css']
})
export class NodeElementComponent implements OnInit {

  @Input() nodeData: NodeData
  editNodeSection=false;

  constructor(private data: DataService) { }

  showEditSection(event,data: NodeData){
    this.data.changeEditNodeView(!this.editNodeSection);
    this.data.currentNode = data; //how to fix this
    //this.data.changeCurrentNode(data);
  }

  ngOnInit(): void {

    this.data.showNodeEditBoolean.subscribe(editBool => this.editNodeSection = editBool);
    this.data.currentNode;
    var app = ngstorage.module('MyApp', ["ngStorage"])

    app.controller('MyController', function ($scope, $localStorage, $sessionStorage, $window) {
        $localStorage.LocalMessage = "LocalStorage: My name is Mudassar Khan.";
        $sessionStorage.SessionMessage = "SessionStorage: My name is Mudassar Khan.";
    });
  }

  delete(data: NodeData){
    this.data.nodes.forEach((element,index)=>{
      if(element==data) this.data.nodes.splice(index,1);
    });

  }
}

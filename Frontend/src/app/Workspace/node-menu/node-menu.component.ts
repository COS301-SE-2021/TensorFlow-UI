import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "../../Components/navbar/navbar.component";
import {Store} from "@ngxs/store";
import {RemoveNodeFromStorage, RemoveTFNode} from "../../../Storage/workspace";
import {nodeDebugInfo} from "@angular/compiler-cli/src/ngtsc/util/src/typescript";

@Component({
  selector: 'app-node-menu',
  templateUrl: './node-menu.component.html',
  styleUrls: ['./node-menu.component.css']
})
export class NodeMenuComponent implements OnInit, AfterContentInit {

  @Input() store;
  @Input() navbar;
  @Input() nodeInput;
  constructor() { }


  ngOnInit(): void {
  }

  ngAfterContentInit(){
  }

  openNodeView(navbar){

  }

  deleteNode(){
    let nodes = this.navbar.TFNodeList;
    let that = this;
    let tempNode;

    //console.log(this.navbar.TFNodeList)
    nodes.forEach(function(element){
      if(element.id == that.nodeInput.id) {
        console.log(element);
        that.store.dispatch(new RemoveTFNode(element))
        tempNode = element;
      }
    });
    this.navbar.graph.remove(this.nodeInput);
    let i = this.navbar.TFNodeList.findIndex(element => tempNode.id == element.id)
    this.navbar.TFNodeList.splice(i,1);
  }

  closeNodeView(){
    this.nodeInput = null;
  }

}

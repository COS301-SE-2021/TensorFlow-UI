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
    this.navbar.deleteNodeCommand.setNode(this.nodeInput);
    this.closeNodeView();
    this.navbar.executeCommand(this.navbar.deleteNodeCommand);

  }

  closeNodeView(){
    this.nodeInput = null;
  }

}

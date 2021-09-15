import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-node-menu',
  templateUrl: './node-menu.component.html',
  styleUrls: ['./node-menu.component.css']
})
export class NodeMenuComponent implements OnInit, AfterContentInit {

  @Input() nodeInput;
  constructor() { }


  ngOnInit(): void {
    console.log(this.nodeInput);
  }

  ngAfterContentInit(){
    console.log(this.nodeInput);
  }

  openNodeView(navbar){

  }

  closeNodeView(){
    this.nodeInput = null;
  }

}

import {
  Component, OnInit, ViewChild
} from '@angular/core';
import {DataService} from "../../data.service";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  createNodeBool: boolean;

  constructor(private data : DataService) {
    this.data.createNodeBoolean.subscribe(nodeBool =>this.createNodeBool = nodeBool)
  }

  ngOnInit(): void {
    this.data.createNodeBoolean.subscribe(nodeBool =>this.createNodeBool = nodeBool)
  }

  createNodeForm(){
    this.data.changeCreateFormBoolean(true);
  }

  createNode(){
    this.data.changeCreateNodeBoolean(true);
  }

  createFunctionalNode(){

  }

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}

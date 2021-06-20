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
    this.data.currentBoolean.subscribe(nodeBool =>this.createNodeBool = nodeBool)
  }

  ngOnInit(): void {
    this.data.currentBoolean.subscribe(nodeBool =>this.createNodeBool = nodeBool)
  }

  createNode(){
    this.data.changeCreateNodeBoolean(true);
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

import {
  Component, OnInit, TemplateRef, ViewChild, AfterViewInit, Inject, ViewContainerRef, ComponentFactoryResolver,
} from '@angular/core';
import {DataService} from "../../data.service";

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
}

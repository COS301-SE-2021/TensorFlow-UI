import { Component, OnInit, TemplateRef, ViewChild, AfterViewInit, Inject, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @ViewChild('parent', {static: false, read: ViewContainerRef}) target:ViewContainerRef;
  private componentRef: ComponentRef<any>;


  constructor(private resolver : ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

}

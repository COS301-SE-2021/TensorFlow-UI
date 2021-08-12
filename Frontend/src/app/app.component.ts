import {Component, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'Frontend';

  //@ViewChild(ComponentsModule) child;

  createNodeBool: Boolean;

  constructor() {

  }

  ngAfterViewInit() {

  }
}

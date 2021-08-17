import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor() { }
  @Input() element: string;

  ngOnInit(): void {
  }

  projectImport(ID){
    console.log(ID);
  }
}

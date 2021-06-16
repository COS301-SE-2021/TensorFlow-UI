import {Component, OnInit } from '@angular/core';
import {DataService} from "../../data.service";

@Component({
  selector: 'app-workspace-boundary',
  templateUrl: './workspace-boundary.component.html',
  styleUrls: ['./workspace-boundary.component.css']
})
export class WorkspaceBoundaryComponent implements OnInit {

  createNodeBool: boolean;
  showNodeCreateSection = false;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentBoolean.subscribe(nodeBool => this.createNodeBool = nodeBool);
  }

}

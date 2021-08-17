import {Component, Input, OnInit} from '@angular/core';
import {importData, data} from "../../GITApi";
import {ChangeBooleanValue, WorkspaceState} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private store: Store) { }
  @Input() element: string;

  ngOnInit(): void {
  }

  projectImport(ID){
    importData(ID);

    let workspace = document.getElementById("workspace-boundary");
    let importFromCommunity = document.getElementById("importFromCommunity");
    this.store.dispatch(new ChangeBooleanValue(false));
    if(workspace && importFromCommunity){
      if(workspace.style.display=="none"){
        workspace.style.display = "block";
        importFromCommunity.style.display = "none";
      }
      else{
        workspace.style.display = "none";
        importFromCommunity.style.display = "block";
      }
    }
  }
}

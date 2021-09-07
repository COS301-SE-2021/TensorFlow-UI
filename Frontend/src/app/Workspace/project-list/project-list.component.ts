import {Component, Input, OnInit} from '@angular/core';
import {ChangeBooleanValue, WorkspaceState} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";
import {GitAPI} from "../../git-api";

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private store: Store) { }
  @Input() element: string;
  public API: GitAPI= new GitAPI(this.store);
  ngOnInit(): void {
  }

  //Import project data and based on the result, either display or hide the workspace and show/hide the import page
  projectImport(ID){

    let previewTabs = document.getElementById("previewTabs") as HTMLElement;
    if(previewTabs){
      previewTabs.click();
    }
    // this.API.importData(ID);
    //
    // let workspace = document.getElementById("workspace-boundary");
    // let importFromCommunity = document.getElementById("importFromCommunity");
    // this.store.dispatch(new ChangeBooleanValue(false));
    // if(workspace && importFromCommunity){
    //   if(workspace.style.display=="none"){
    //     workspace.style.display = "block";
    //     importFromCommunity.style.display = "none";
    //   }
    //   else{
    //     workspace.style.display = "none";
    //     importFromCommunity.style.display = "block";
    //   }
    // }
  }
}

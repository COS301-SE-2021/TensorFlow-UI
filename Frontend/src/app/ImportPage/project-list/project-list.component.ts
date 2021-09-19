import {Component, Input, OnInit} from '@angular/core';
import {ChangeBooleanValue, WorkspaceState} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";
import {GitAPI} from "../../git-api";
import {PopulatePreviewCommand} from "../../../Command/PopulatePreviewCommand";
import projectList from "../importPageContent/import-page-content.component";


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private store: Store) { }
  @Input() element: string;
  @Input() navbar;
  public API: GitAPI= GitAPI.getInstance(this.store);

  ngOnInit(): void {
  }
  //Import project data and based on the result, either display or hide the workspace and show/hide the import page
  projectImport(ID){
      this.API.importData(ID, this.navbar);
    let previewTabs = document.getElementById("previewTab") as HTMLElement;
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

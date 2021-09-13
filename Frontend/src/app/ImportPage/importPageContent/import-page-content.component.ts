import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Store} from "@ngxs/store";
import {GitAPI} from "../../git-api";
import projectList from "../../Workspace/import/import.component";

@Component({
  selector: 'app-import-page-content',
  templateUrl: './import-page-content.component.html',
  styleUrls: ['./import-page-content.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImportPageContentComponent implements OnInit {

  public gitAPI: GitAPI;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.gitAPI = new GitAPI(this.store);


    this.gitAPI.getProjectsFromRepoAndUpdateProjectListArray();
    console.log(this.gitAPI);
    console.log(projectList);
  }


}

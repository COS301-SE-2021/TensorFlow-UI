import { Component, OnInit } from '@angular/core';
import projectList from "../import/import.component";
import {WorkspaceState} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";
import {GitAPI} from "../../git-api";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {
  constructor(public store: Store) { }
  public API: GitAPI= new GitAPI(this.store);

  ngOnInit(): void {
  }

  showhide(){
    this.API.GetList();
  }

  exportToPc(): boolean{
    //const procName = this.store.selectSnapshot(WorkspaceState).projectName;
    var exportAs = this.store.selectSnapshot(WorkspaceState).projectName;
    if (exportAs == null || exportAs == ""){
      alert("Please name your Project and try again.\n Name project by clicking on the gear shaped button.");
      return false;
    } else {
      //const procDescription = this.store.selectSnapshot(WorkspaceState).projectDescription;
      var description = this.store.selectSnapshot(WorkspaceState).projectDescription;
      var file = this.createDoc(description);
      this.download(file, exportAs+'.json');
    }
    return true;
  }

  download(file, fileName){

    var a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();

  }

  exportToLib(): boolean {
    //const storageProject = this.store.selectSnapshot(WorkspaceState).project;
    this.API.GetList();
    var exportAs = this.store.selectSnapshot(WorkspaceState).projectName;
    if (exportAs == null || exportAs == ""){
      alert("Please name your Project and try again.\n Name project by clicking on the gear shaped button.");
      return false;
    } else {
      var exists = false;

      var keep = exportAs + ".json";
      for (let i = 0; i < projectList.length; i++) {
        if (keep == projectList[i]){
          exists = true;
        }
      }
      if (exists){
        alert('Export failed:\nA file with the same name already exists in the library.');
        return false;
      } else {
        var description = this.store.selectSnapshot(WorkspaceState).projectDescription;
        var file = this.createDoc(description);
        var reader = new FileReader();
        var base64dta ;
        reader.readAsDataURL(file);
        let that = this;
        reader.onloadend = function (){
          base64dta = reader.result;
          base64dta = base64dta.substr(29);
          that.API.commit(exportAs, base64dta, description);
        }
      }
    }
    return true;
  }

  createDoc(description){
    //Export Functionality: Export retrieves data from storage here.
    const storageNodes = this.store.selectSnapshot(WorkspaceState).TFNode;
    const storageLines = this.store.selectSnapshot(WorkspaceState).lines;
    let doc = {};
    doc['description'] = description;
    doc['TFNode'] = storageNodes;
    doc['lines'] = storageLines;
    let jsonDta = JSON.stringify(doc);
    var file = new Blob([jsonDta], {type: 'application/json'});
    return file;
  }
}

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

  constructor(private store: Store, public API: GitAPI) { }


  ngOnInit(): void {
  }

  showhide(){
    var el = document.getElementById('hidden');
    if (el != null){
      if ( el.style.display == 'none'){
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    }
    this.API.GetList();
  }

  exportToPc(){
    var exportAs = prompt("Name Your Project:", "");
    if (exportAs == null || exportAs == ""){
      alert("Please name your Project and try again.")
    } else {

      const storageNodes = this.store.selectSnapshot(WorkspaceState).nodes;
      const storageLines = this.store.selectSnapshot(WorkspaceState).lines;
      let doc = [];
      doc['nodes'] = storageNodes;
      doc['lines'] = storageLines;
      var file = this.createDoc();
      this.download(file, exportAs+'.json');
      this.showhide();
    }

  }

  download(file, fileName) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  exportToLib() {
    var exportAs = prompt("Name Your Project:", "");
    if (exportAs == null || exportAs == ""){
      alert("Please name your Project and try again.");
    } else {
      var exists = false;

      var keep = exportAs + ".json";
      for (let i = 0; i < projectList.length; i++) {
        if (keep == projectList[i]){
          exists = true;
        }
      }
      if (exists){
        alert('A file with the same name already exists in the library.');
      } else {
        var file = this.createDoc();
        var reader = new FileReader();
        var base64dta ;
        reader.readAsDataURL(file);
        let that = this;
        reader.onloadend = function (){
          base64dta = reader.result;
          base64dta = base64dta.substr(29);
          that.API.commit(exportAs, base64dta);
        }
        this.showhide();
      }
    }
  }

  createDoc(){
    //Export Functionality: Export retrieves data from storage here.
    const storageNodes = this.store.selectSnapshot(WorkspaceState).nodes;
    const storageLines = this.store.selectSnapshot(WorkspaceState).lines;
    let doc = {};
    doc['nodes'] = storageNodes;
    doc['lines'] = storageLines;
    let jsonDta = JSON.stringify(doc);
    var file = new Blob([jsonDta], {type: 'application/json'});
    return file;
  }
}

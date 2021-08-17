import { Component, OnInit } from '@angular/core';
import commit from '../../GITApi.js'
import {GetList} from '../../GITApi.js'
import tensorList from "../import/import.component";
import {WorkspaceState} from "../../../Storage/workspace";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor(private store: Store) { }


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
      // var el = document.getElementsByClassName("draggable");
      // if (el != null){
      //   let lst = {};
      //   for (var i = 1; i < el.length; i++) {
      //     lst[i-1] = el[i].outerHTML;
      //   }
      var file = this.createDoc();

      this.download(file, exportAs+'.json');
      // }
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
    // const storageNodes = this.store.selectSnapshot(WorkspaceState).nodes;
    // const storageLines = this.store.selectSnapshot(WorkspaceState).lines;
    var exportAs = prompt("Name Your Project:", "");
    if (exportAs == null || exportAs == ""){
      alert("Please name your Project and try again.");
    } else {
      var exists = false;
      GetList();

      var keep = exportAs + ".json";
      for (let i = 0; i < tensorList.length; i++) {
        if (keep == tensorList[i]){
          exists = true;
        }
      }
      if (exists){
        alert('A file with the same name already exists in the library.');
      } else {
        // var el = document.getElementsByClassName("draggable");
        // if (el != null){
        //   var lst1 = {};
        //   for (var k = 1; k < el.length; k++) {
        //     lst1[k-1] = el[k].outerHTML;
        //   }
        //
        //   var jsonData = JSON.stringify(lst1);
        var file = this.createDoc();
        var reader = new FileReader();
        var base64dta ;
        reader.readAsDataURL(file);
        reader.onloadend = function (){
          base64dta = reader.result;
          base64dta = base64dta.substr(29);
          commit(exportAs, base64dta);
        }
        this.showhide();
      }
    }
  }

  createDoc(){
    const storageNodes = this.store.selectSnapshot(WorkspaceState).nodes;
    const storageLines = this.store.selectSnapshot(WorkspaceState).lines;
    let doc = [];
    doc['nodes'] = storageNodes;
    doc['lines'] = storageLines;
    let jsonDta = JSON.stringify(doc)
    var file = new Blob([jsonDta], {type: 'application/json'});
    return file;
  }
}

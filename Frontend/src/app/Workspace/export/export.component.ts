import { Component, OnInit } from '@angular/core';
import commit from '../../GITApi.js'
import {GetList} from '../../GITApi.js'
import application from "@angular-devkit/build-angular/src/babel/presets/application";

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor() { }


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
      var el = document.getElementsByClassName("draggable");
      if (el != null){
        let lst = {};
        for (var i = 1; i < el.length; i++) {
          lst[i-1] = el[i].outerHTML;
        }
        console.log(lst);

        var jsonData = JSON.stringify(lst);

        this.download(jsonData, exportAs+'.json', 'application/json');
      }
      this.showhide();
    }

  }

  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
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
      var lst = GetList();
      for (var i = 0; i < lst.length; i++) {
        if (exportAs == lst[i]){
          exists = true;
        }
      }
      if (exists){
        alert('A file with the same name already exists in the library.');
      } else {
        var el = document.getElementsByClassName("draggable");
        if (el != null){
          let lst = {};
          for (var k = 1; k < el.length; k++) {
            lst[k-1] = el[k].outerHTML;
          }

          var jsonData = JSON.stringify(lst);
        }
        commit(exportAs, "bXkgbmV3IGZpbGUgY29udGVudHM=");
        this.showhide();
      }
    }
  }
}

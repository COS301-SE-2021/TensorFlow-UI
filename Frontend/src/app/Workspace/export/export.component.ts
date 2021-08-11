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
      GetList();
      var keep = exportAs + ".json";
      var cbox = document.getElementById("TFUIlib");
      if(cbox!= null) {
        for (let i = 0; i < cbox.children.length; i++) {
          if (keep == cbox.children[i].innerHTML){
            exists = true;
          }
        }
      }
      if (exists){
        alert('A file with the same name already exists in the library.');
      } else {
        var el = document.getElementsByClassName("draggable");
        if (el != null){
          var lst1 = {};
          for (var k = 1; k < el.length; k++) {
            lst1[k-1] = el[k].outerHTML;
          }

          var jsonData = JSON.stringify(lst1);
          var file = new Blob([jsonData], {type: 'application/json'});
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
  }
}

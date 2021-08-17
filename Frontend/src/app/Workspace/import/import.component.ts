import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GetData, GetList} from '../../GITApi.js'
import {Store} from "@ngxs/store";
import {ChangeBooleanValue, WorkspaceState} from "../../../Storage/workspace";

let projectList: string[] = [""];
export default projectList;


@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  public projectL: string[] = [""];

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  showhide(){
    GetList();
    this.projectL = projectList;
    var el = document.getElementById('hidden1');
    if (el != null){
      if ( el.style.display == 'none'){
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    }
  }

  ImportFromPC() {
    var x = document.getElementById("myfile") as HTMLInputElement;
    var txt = "";
    if (x != null){
      if ('files' in x) {
        // @ts-ignore
        if (x.files.length == 0) {
          txt = "Select one or more files.";
        } else {

          txt += "<br><strong>" + (1) + ". file</strong><br>";
          // @ts-ignore
          var file = x.files[0];
          if ('name' in file) {
            txt += "name: " + file.name + "<br>";
          }
          if ('size' in file) {
            txt += "size: " + file.size + " bytes <br> <br>";
          }

          var fr = new FileReader();
          fr.onload = function () {
            console.log(fr.result);
          }
          // @ts-ignore
          fr.readAsText(x.files[0]);
        }
      }
      console.log(txt);
      this.dataToStore(txt);
    }
  }

  ImportFromLib() {
      let workspace = document.getElementById("workspace-boundary");
      const showWorkspace = this.store.selectSnapshot(WorkspaceState).showWorkspace;

      this.store.dispatch(new ChangeBooleanValue(false));

      if(workspace){
        if(workspace.style.display=="none"){
          workspace.style.display = "block";
        }
        else{
          workspace.style.display = "none";
        }
      }

    // workspace.style.display = "none";
  }

  dataToStore(dta){

  }
}

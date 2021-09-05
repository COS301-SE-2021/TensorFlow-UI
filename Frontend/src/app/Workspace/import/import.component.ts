import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {ChangeBooleanValue, WorkspaceState} from "../../../Storage/workspace";
import {GitAPI} from "../../git-api";

let projectList: string[] = [""];
export default projectList;

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  public projectL: string[] = [""];
  public API: GitAPI= new GitAPI(this.store);
  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  showhide(){
    this.API.GetList();
    this.projectL = [""];
    this.projectL = projectList;
  }

  ImportFromPC() {
    var x = document.getElementById("myfile") as HTMLInputElement;
    var txt = "";
    if (x != null){
      if ('files' in x) {
        // @ts-ignore
        if (x.files.length == 0) {
          alert("Select one or more files.");
        } else {
          // @ts-ignore
          var file = x.files[0];
          if (file.type !="application/json"){
            alert("Please upload a file of type application/json");
          } else {
            if ('name' in file) {
              txt += "name: " + file.name + "\n";
            }
            if ('size' in file) {
              txt += "size: " + file.size + " bytes";
            }
            var fr = new FileReader();
            let that = this;
            fr.onload = function () {
              let response = fr.result;
              that.API.dataToStore(response);
            }
            // @ts-ignore
            //x.files[0] = "";
            fr.readAsText(file);
          }
        }
      }
      console.log(txt);
    }
  }

  ImportFromLib() {
      let importFromCommunity = document.getElementById("importFromCommunity");
      if(importFromCommunity){
        if(importFromCommunity.style.display=="none"){
          importFromCommunity.style.display = "block"
        }
        else{
          importFromCommunity.style.display = "none";
        }
      }
  }
}

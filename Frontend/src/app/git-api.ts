import {Store} from "@ngxs/store";
import projectList, {previewData} from "./ImportPage/importPageContent/import-page-content.component";
import {
    AddLineConnectorToStorage,
    AddNodeToStorage,
    AddProjectDescription,
    AddTFNode,
    WorkspaceState
} from "../Storage/workspace";
import {PAT} from "./config.js"
import { TFVariable } from "./tf/tensor/common";
import {Event} from "@angular/router";
import {PopulatePreviewCommand} from "../Command/PopulatePreviewCommand";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {NodeStore, TFNode} from "./tf";
import {lineConnectors} from "./node-data";
import {ReloadFromStoreCommand} from "../Command/ReloadFromStoreCommand";



export class GitAPI {
    public event1;
    public static instance: GitAPI;
  constructor(private store: Store ) {
      this.event1 = new Event("populateList");
  }

  public static getInstance(store){
      if (this.instance == null){
          this.instance= new GitAPI(store);
      }
      return this.instance;
  }

  public commit(user, token, Name, Data, description){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", PAT);
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "message": description,
      "committer": {
        "name": user.displayName,
        "email": user.email
      },
      "content": Data
    });

    fetch("https://api.github.com/repos/W-Kruger/TFUI-Community-Library/contents/" + Name +".json", {method: 'PUT', headers: myHeaders,body: raw,redirect: 'follow'})
      .then(response => {response.text(); if(!response.ok){alert("Export Failed. \nError logged on console.");} else {alert("Export Successful.");this.updateIndex(user, Name, description)}})
      // .then(result => {alert("Export Successful.")})
      .catch(error => console.log('error', error));
  }

  public GetList(){
    fetch("https://api.github.com/repos/W-Kruger/TFUI-Community-Library/contents", {method: 'GET', redirect: 'follow'})
      .then(response => response.text())
      .then(result => this.poplst(result))
      .catch(error => console.log('error', error));
  }

  public importData(ID, nav){
    fetch("https://raw.githubusercontent.com/W-Kruger/TFUI-Community-Library/main/" + ID, {method: 'GET', redirect: 'follow'})
      .then(response => response.text())
      .then(result => {this.preview(result, nav)})
      .catch(error => console.log('error', error));
  }

  public previewData : string = "";

  public preview(dta, nav){
      var json = JSON.parse(dta);
      let popPreview = new PopulatePreviewCommand(this.store, nav, json);
      popPreview.execute();
  }

  public poplst(lst){

    var json = JSON.parse(lst);
    var l = new Array(json.length-1)
    for (let i = 0; i < json.length; i++) {
      l[i]= json[i].name;
    }

    while (projectList.length > 0){
      projectList.pop();
    }
    for (let i = 0; i < l.length; i++) {
      if (l[i] !== "README.md"){
        projectList.push(l[i]);
      }
    }
      if (this.event1 != null){
          document.dispatchEvent(this.event1);
      }
  }

  public dataToStore(nav, dta = this.previewData){
      if (dta != null && previewData.length > 0) {
          try {
              var data = JSON.parse(dta);
              const nodesInStorage = this.store.selectSnapshot(WorkspaceState).TFNode;
              let val = nodesInStorage.length;
              const linksInStorage = this.store.selectSnapshot(WorkspaceState).links;
              let linkval = linksInStorage.length-1;

              for (let i = 0; i < data.TFNode.length; i++) {
                  let tfnode = new NodeStore[data.TFNode[i].selector]();
                  tfnode.selector = data.TFNode[i].selector;
                  tfnode.id = data.TFNode[i].id + val;
                  tfnode.position = data.TFNode[i].position;
                  tfnode.inputs = data.TFNode[i].inputs;
                  tfnode.outputs = data.TFNode[i].outputs;
                  tfnode.name = data.TFNode[i].name + val;
                  if (data.TFNode[i].widgets != null) {
                      tfnode.widgets = data.TFNode[i].widgets;
                  }
                  this.store.dispatch(new AddTFNode(tfnode));
              }
              for (let k = 0; k < data.links.length; k++) {
                  if (data.links[k].target_id != 1) {
                      const line: lineConnectors = {
                          id: data.links[k].id + linkval,
                          origin_id: data.links[k].origin_id + val,
                          origin_slot: data.links[k].origin_slot,
                          target_id: data.links[k].target_id + val,
                          target_slot: data.links[k].target_slot,
                          type: data.links[k].type
                      }
                      this.store.dispatch(new AddLineConnectorToStorage(line));
                  }
              }
              window.location.reload();
          } catch (e) {
              console.log(e);
              alert("File provided was not constructed by Tensorflow UI");
          }
      } else {
          alert("No file selected for import.")
      }
  }

  public updateIndex(user, Name, description){
      fetch("https://raw.githubusercontent.com/W-Kruger/TFUI-Community-Library/main/index.json", {method: 'GET', redirect: 'follow'})
          .then(response => response.text())
          .then(result => {
              let obj = JSON.parse(result);
              obj.push({"ProjectName":Name,"user":user.displayName,"description":description});
              obj.sort(function(a,b){return a.ProjectName.localeCompare(b.ProjectName)});
              let jsonDta = JSON.stringify(obj);
              var file = new Blob([jsonDta], {type: 'application/json'});
              var reader = new FileReader();
              var base64dta;
              reader.readAsDataURL(file);
              let that = this;
              reader.onloadend = function (){
                  base64dta = reader.result;
                  base64dta = base64dta.substr(29);
                  that.commitUpdatedIndex(user,base64dta);
              }
          })
          .catch(error => console.log('error', error));
  }
  public commitUpdatedIndex(user, data){
      fetch("https://api.github.com/repos/W-Kruger/TFUI-Community-Library/contents/index.json?ref=main",{method: 'GET', redirect: 'follow'})
          .then(response => response.text())
          .then(result => {
              let res = JSON.parse(result);
              var myHeaders = new Headers();
              myHeaders.append("Authorization", PAT);
              myHeaders.append("Content-Type", "application/json");
              var raw = JSON.stringify({
                  "message": "Index Update",
                  "committer": {
                      "name": "W-Kruger",
                      "email": "u18014934@tuks.co.za"
                  },
                  "content": data,
                  "sha": res.sha
              });
              fetch("https://api.github.com/repos/W-Kruger/TFUI-Community-Library/contents/index.json", {method: 'PUT', headers: myHeaders,body: raw,redirect: 'follow'})
                  .then(response => {response.text();})
                  .catch(error => console.log('error', error));
          })
          .catch(error => console.log('error', error));
  }
}

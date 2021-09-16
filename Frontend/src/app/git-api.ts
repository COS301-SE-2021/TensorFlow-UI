import {Store} from "@ngxs/store";
import projectList from "./ImportPage/importPageContent/import-page-content.component";
import {AddLineConnectorToStorage, AddNodeToStorage, AddProjectDescription, AddTFNode} from "../Storage/workspace";
import {PAT} from "./config.js"
import { TFVariable } from "./tf/tensor/common";


export class GitAPI {

  constructor(private store: Store ) {
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

  public importData(ID){
    fetch("https://raw.githubusercontent.com/W-Kruger/TFUI-Community-Library/main/" + ID, {method: 'GET', redirect: 'follow'})
      .then(response => response.text())
      .then(result => this.dataToStore(result))
      .catch(error => console.log('error', error));
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
  }

  public dataToStore(dta){
    try{
      var data = JSON.parse(dta);
      this.store.dispatch(new AddProjectDescription(data.description));

      for (let i = 0; i < data.TFNode.length; i++) {
        let tfnode = new TFVariable();
        tfnode.name= data.TFNode[i].name;
        tfnode.type=data.TFNode[i].type;
        tfnode.selector = data.TFNode[i].selector;
        if (data.TFNode[i].data != null){
          tfnode.data = data.TFNode[i].data;
        }
        // tfnode.x=data.nodes[i].x;
        // tfnode.y =data.nodes[i].y;
        this.store.dispatch(new AddTFNode(tfnode));
      }
      for (let k = 0; k < data.lines.length; k++) {
        var start = data.lines[k].start;
        var end = data.lines[k].end;
        var line = data.lines[k].line;
        // this.store.dispatch(new AddLineConnectorToStorage({end: end, line:line, start: start}));
      }

    } catch (e){
      console.log(e);
      alert("File provided was not constructed by Tensorflow UI");
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

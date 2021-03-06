import {Store} from "@ngxs/store";
import projectList from "./ImportPage/importPageContent/import-page-content.component";
import {PAT} from "./config.js"
import {Event} from "@angular/router";
import {PopulatePreviewCommand} from "../Command/PopulatePreviewCommand";

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

    fetch("https://api.github.com/repos/Try-Catch-Degree/TFUI-Community-Library/contents/" + Name +".json", {method: 'PUT', headers: myHeaders,body: raw,redirect: 'follow'})
      .then(response => {response.text(); if(!response.ok){alert("Export Failed. \nError logged on console.");} else {alert("Export Successful.");this.updateIndex(user, Name, description)}})
      // .then(result => {alert("Export Successful.")})
      .catch(error => console.log('error', error));
  }

  public GetList(){
    fetch("https://api.github.com/repos/Try-Catch-Degree/TFUI-Community-Library/contents", {method: 'GET', redirect: 'follow'})
      .then(response => response.text())
      .then(result => this.poplst(result))
      .catch(error => console.log('error', error));
  }

  public importData(ID, nav){
    fetch("https://raw.githubusercontent.com/Try-Catch-Degree/TFUI-Community-Library/main/" + ID, {method: 'GET', redirect: 'follow'})
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
      fetch("https://raw.githubusercontent.com/Try-Catch-Degree/TFUI-Community-Library/main/index.json", {method: 'GET', redirect: 'follow'})
          .then(response => response.text())
          .then(result => {
              let obj = JSON.parse(result);
              var json = JSON.parse(lst);
              var l = new Array(json.length-1)
              for (let i = 0; i < json.length; i++) {
                  let keep = {description:"Description", user: ""};
                  for (let j = 0; j < obj.length; j++) {
                      if(json[i].name.localeCompare(obj[j].ProjectName+".json") == 0){
                          keep = obj[j];
                          j=obj.length;
                      }
                  }
                  let item = {};
                  item['pname'] = json[i].name;
                  item['description']=keep.description;
                  item['by']=keep.user;
                  l[i] = item;
                  //l[i]= {pname:json[i].name, description:keep.description, by:keep.user};
              }

              while (projectList.length > 0){
                  projectList.pop();
              }
              for (let i = 0; i < l.length; i++) {
                  if(l[i].pname !== "README.md" && l[i].pname!== "index.json"){
                      projectList.push(l[i]);
                  }
              }
              if (this.event1 != null){
                  document.dispatchEvent(this.event1);
              }
          })
          .catch(error => console.log('error', error));
  }

  public updateIndex(user, Name, description){
      fetch("https://raw.githubusercontent.com/Try-Catch-Degree/TFUI-Community-Library/main/index.json", {method: 'GET', redirect: 'follow'})
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
      fetch("https://api.github.com/repos/Try-Catch-Degree/TFUI-Community-Library/contents/index.json?ref=main",{method: 'GET', redirect: 'follow'})
          .then(response => response.text())
          .then(result => {
              let res = JSON.parse(result);
              var myHeaders = new Headers();
              myHeaders.append("Authorization", PAT);
              myHeaders.append("Content-Type", "application/json");
              var raw = JSON.stringify({
                  "message": "Index Update",
                  "committer": {
                      "name": "Try-Catch-Degree",
                      "email": "trycatchdegree@gmail.com"
                  },
                  "content": data,
                  "sha": res.sha
              });
              fetch("https://api.github.com/repos/Try-Catch-Degree/TFUI-Community-Library/contents/index.json", {method: 'PUT', headers: myHeaders,body: raw,redirect: 'follow'})
                  .then(response => {response.text();})
                  .catch(error => console.log('error', error));
          })
          .catch(error => console.log('error', error));
  }
}

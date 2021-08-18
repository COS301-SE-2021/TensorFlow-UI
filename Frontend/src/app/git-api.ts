import {Store} from "@ngxs/store";
import {mail, PAT, user} from "./config";
import projectList from "./Workspace/import/import.component";
import {AddLineConnectorToStorage, AddNodeToStorage, AddProjectDescription, AddTFNode} from "../Storage/workspace";
import {TFVariable} from "./tf";


export class GitAPI {

  constructor(private store: Store ) {

  }

  public commit(Name, Data, description){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", PAT);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "message": description,
      "committer": {
        "name": user,
        "email": mail
      },
      "content": Data
    });

    fetch("https://api.github.com/repos/W-Kruger/TFUI-Community-Library/contents/" + Name +".json", {method: 'PUT', headers: myHeaders,body: raw,redirect: 'follow'})
      .then(response => {response.text(); if(!response.ok){alert("Export Failed. \nError logged on console.");} else {alert("Export Successful.");}})
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
        // tfnode.x=data.nodes[i].x;
        // tfnode.y =data.nodes[i].y;
        this.store.dispatch(new AddTFNode(tfnode));
      }
      for (let k = 0; k < data.lines.length; k++) {
        var start = data.lines[k].start;
        var end = data.lines[k].end;
        var line = data.lines[k].line;
        this.store.dispatch(new AddLineConnectorToStorage({end: end, line:line, start: start}));
      }

    } catch (e){
      console.log(e);
      alert("File provided was not constructed by Tensorflow UI");
    }
  }
}

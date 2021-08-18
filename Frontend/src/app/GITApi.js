import {PAT} from './config.js'
import {user} from './config.js'
import {mail} from './config.js'
import projectList from './Workspace/import/import.component.ts'
import {AddLineConnectorToStorage, AddNodeToStorage} from "../Storage/workspace/workspace.actions";

export default function Commit (Name, Data){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", PAT);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "message": "Project Export From TFUI",
    "committer": {
      "name": user,
      "email": mail
    },
    "content": Data
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://api.github.com/repos/W-Kruger/TFUI-Community-Library/contents/" + Name +".json", requestOptions)
    .then(response => {response.text(); if(!response.ok){alert("Export Failed. \n Error lodged on console.");} else {alert("Export Successful.");}})
    // .then(result => {alert("Export Successful.")})
    .catch(error => console.log('error', error));
}

export function GetList(){
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      var json = JSON.parse(this.responseText);
      var lst = new Array(json.length-1)
      for (let i = 0; i < json.length; i++) {
        lst[i]= json[i].name;
      }
        poplst(lst);
    }
  });

  xhr.open("GET", "https://api.github.com/repos/W-Kruger/TFUI-Community-Library/contents");
  xhr.send();
}

export function importData(ID){
  var myHeaders = new Headers();

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  fetch("https://raw.githubusercontent.com/W-Kruger/TFUI-Community-Library/main/" + ID, requestOptions)
    .then(response => response.text())
    .then(result => dataToStore(result))
    .catch(error => console.log('error', error));
}

function poplst(l){
  while (projectList.length > 0){
    projectList.pop();
  }
  for (let i = 0; i < l.length; i++) {
    if (l[i] !== "README.md"){
      projectList.push(l[i]);
    }
  }
}

export function dataToStore(dta){
  try{
    var data = JSON.parse(dta);

    for (let i = 0; i < data.nodes.length; i++) {
      var num=data.nodes[i].num;
      var name=data.nodes[i].name;
      var type=data.nodes[i].type;
      var value=data.nodes[i].value;
      var x=data.nodes[i].x;
      var y =data.nodes[i].y;
      this.store.dispatch(new AddNodeToStorage({num, name, type, value, x, y}));
    }
    for (let k = 0; k < data.lines.length; k++) {
      var start = data.lines[k].start;
      var end = data.lines[k].end;
      var line = data.lines[k].line;
      this.store.dispatch(new AddLineConnectorToStorage({start, end, line}));
    }
  } catch (e){
    console.log(e);
    alert("File provides was not constructed by TFUI");
  }
}




import {PAT} from './config.js'
import {user} from './config.js'
import {mail} from './config.js'
import projectList from './Workspace/import/import.component.ts'

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
      for (let i = 1; i < json.length; i++) {
        lst[i-1]= json[i].name;
      }
        poplst(lst);
    }
  });

  xhr.open("GET", "https://api.github.com/repos/W-Kruger/TFUI-Community-Library/contents");
  xhr.send();
}

export function GetData(ID){
  var myHeaders = new Headers();

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  let gloResult;
  fetch("https://raw.githubusercontent.com/W-Kruger/TFUI-Community-Library/main/" + ID, requestOptions)
    .then(response => response.text())
    .then(result => {console.log(result); gloResult = result})
    .catch(error => console.log('error', error));
  return gloResult;
}

function poplst(l){
  // var cbox = document.getElementById("TFUIlib");
  // if (cbox != null){
  //   cbox.innerHTML = "";
  for (let k = 0; k < projectList.length; k++) {
    projectList[k] = "";
  }
    for (let i = 0; i < l.length; i++) {
      projectList[i] = l[i];
      // var opt = document.createElement('option');
      // opt.value = l[i];
      // opt.innerHTML = l[i];
      // cbox.appendChild(opt);
    }

}

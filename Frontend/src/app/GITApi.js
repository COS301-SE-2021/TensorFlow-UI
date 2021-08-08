import {PAT} from './config.js'
import {user} from './config.js'
import {mail} from './config.js'

export default function Commit (Name, Data){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", PAT);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "message": "my commit message",
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

export function GetList (){

}

export function GetData (ID){

}

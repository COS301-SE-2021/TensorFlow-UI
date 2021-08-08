

export default function Commit (Name, Data){
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer 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");
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "message": "my commit message",
    "committer": {
      "name": "W-Kruger",
      "email": "u18014934@tuks.co.za"
    },
    "content": "bXkgbmV3IGZpbGUgY29udGVudHM="
  });

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://api.github.com/repos/W-Kruger/TFUI-Community-Library/contents/test6.json", requestOptions)
    .then(response => response.text())
    .then(status => {if(status === 200){}})
    .catch(error => console.log('error', error));
}

export function GetList (){

}

export function GetData (ID){

}

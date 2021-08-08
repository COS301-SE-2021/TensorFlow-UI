import { Component, OnInit } from '@angular/core';
import commit from '../GITApi.js'

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.css']
})
export class ExportComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
  }

  showhide(){
    var el = document.getElementById('hidden');
    if (el != null){
      if ( el.style.display == 'none'){
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    }

  }

  exportToPc(){
    var el = document.getElementsByClassName("draggable");
    if (el != null){
      let lst = {};
      for (var i = 1; i < el.length; i++) {
        var html = el[i].outerHTML;
        var data1 = {html : html};
        //console.log(JSON.stringify(data1));
        lst[i-1] = data1;
      }
      console.log(lst);

      var jsonData = JSON.stringify(lst);

      this.download(jsonData, 'TFUIProject.json', 'text/plain');
    }
    this.showhide();
  }

  download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  exportToLib() {
    commit("someName", "someData");
    // this.APIreq();
    this.showhide();
  }

  // APIreq() {
  //   var data = JSON.stringify({
  //     "message": "my commit message",
  //     "committer": {
  //       "name": "W-Kruger",
  //       "email": "u18014934@tuks.co.za"
  //     },
  //     "content": "bXkgbmV3IGZpbGUgY29udGVudHM="
  //   });
  //
  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = false;
  //
  //   xhr.addEventListener("readystatechange", function() {
  //     if(this.readyState === 4) {
  //       console.log(this.responseText);
  //     }
  //   });
  //
  //   xhr.open("PUT", "https://api.github.com/repos/W-Kruger/TFUI-Community-Library/contents/test4.json");
  //   xhr.setRequestHeader("Authorization", "Bearer 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");
  //   xhr.setRequestHeader("Content-Type", "application/json");
  //
  //   xhr.send(data);
  // }
}

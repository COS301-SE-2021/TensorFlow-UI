import { Injectable } from '@angular/core';
import {TFGraph, TFNode} from "./tf";

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {
  // NEW DATA STRUCTURE PY FILE IMPLEMENTATION BELOW HERE
  generateFile(head : TFNode) : File {
    const fs = require("fs");

    const graph : TFGraph = new TFGraph(head);
    let code : string = graph.generateCode(head);

    fs.writeFileSync("../Storage/output.py", code, function (err) {
      if (err) {
        return console.log("FIle Error");
      }
    })

    let file : File = fs.readFile("../Storage/output.py");

    return file;
  }

  runfile (file : File, url : string) : string {
    var savedResponse : string = "";

    var data = "<file contents here>";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
        savedResponse = this.responseText;
      }
    });

    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");

    xhr.send(data);

    return savedResponse;
  }

  createAndRun(head : TFNode, url : string) : string {
    let file : File = this.generateFile(head);
    return this.runfile(file, url);
  }
}

import { Injectable } from '@angular/core';
import {TFAdd, TFConstant, TFGraph, TFNode} from "./tf";
import * as FileSaver from "file-saver";

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {
  // NEW DATA STRUCTURE .PY FILE IMPLEMENTATION BELOW HERE
  generateFile(head : TFNode) : string {

    // QUICK CODEGEN TESTING THINGS
    /*
    var topNode : TFNode = new TFAdd("root");
    var var1 : TFConstant = new TFConstant(1, "var1");
    var var2 : TFConstant = new TFConstant(2, "var2");
    topNode.childOne = var1;
    topNode.childTwo = var2;
    head = topNode;
     */

    var graph : TFGraph = new TFGraph(head);
    var code = "import tensorflow as tf\n";
    code += graph.generateCode(head);
    console.log(code);
    var blob = new Blob([code], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "output.py");
    return code;
  }

  runfile (head : TFNode, url : string) : string {
    var graph : TFGraph = new TFGraph(head);
    var code = "import tensorflow as tf\n";
    code += graph.generateCode(head);
    console.log(code);
    var blob = new Blob([code], {type: "text/plain;charset=utf-8"});
    var savedResponse : string = "";
    var data = new FormData();
    let filename = (Math.random() * 10).toString() + ".py";
    data.append("file", blob, filename);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
      if(this.readyState === 4) {
        console.log(this.responseText);
        savedResponse = this.responseText;
      }
    });
    xhr.open("POST", url);
    xhr.send(data);
    return savedResponse;
    console.log(savedResponse);
  }
}

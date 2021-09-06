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

    console.log(head);
    var graph : TFGraph = new TFGraph(head);
    var code = "import tensorflow as tf\n";
    code += graph.generateCode(head.childOne);
    console.log(code);
    var blob = new Blob([code], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "output.py");
    return code;
  }

  runfile (head : TFNode, url : string) : string {
    var graph : TFGraph = new TFGraph(head);
    console.log(head.inputs)
    var file : File = new File([graph.generateCode(head.childOne)], "output.py");
    var savedResponse : string = "";
    // var data = file;
    // var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    // xhr.addEventListener("readystatechange", function() {
    //   if(this.readyState === 4) {
    //     console.log(this.responseText);
    //     savedResponse = this.responseText;
    //   }
    // });
    // xhr.open("POST", url);
    // xhr.setRequestHeader("Content-Type", "application/octet-stream");
    // xhr.send(data);
    return savedResponse;
  }

  createAndRun(head : TFNode, url : string) : string {
    return this.runfile(head, url);
  }
}

import { Injectable } from '@angular/core';
import { TFGraph, TFNode } from "./tf";
import * as FileSaver from "file-saver";
import { lineConnectors } from "./node-data";
import { root } from "rxjs/internal-compatibility";
import { Store } from "@ngxs/store";
import { userVariableNames } from "./tf/userVariableNames";
import { MatDialog } from "@angular/material/dialog";
import { CodeGeneratorDialogComponent } from "./code-generator-dialog/code-generator-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {

  constructor(private store: Store, public dialog: MatDialog) {

  }

  // NEW DATA STRUCTURE .PY FILE IMPLEMENTATION BELOW HERE
  generateFile(head: TFNode, tfNodes: TFNode[], links: lineConnectors[]): string {

    // QUICK CODEGEN TESTING THINGS
    /*
    var topNode : TFNode = new TFAdd("root");
    var var1 : TFConstant = new TFConstant(1, "var1");
    var var2 : TFConstant = new TFConstant(2, "var2");
    topNode.childOne = var1;
    topNode.childTwo = var2;
    head = topNode;
     */

    let graph: TFGraph = new TFGraph(head);
    let code = "import tensorflow as tf\n";

    let rootInputLinkID = head.inputs[0].link;
    let link = links.find(element => element.id == rootInputLinkID);

    let rootChildID = link?.origin_id;
    let rootChild = tfNodes.find(element => element.id == rootChildID);

    if (rootChild) {
      tfNodes.forEach(function (value) { value.visitCount = 0 });
      let generatedCode = graph.generateCode(rootChild, links, tfNodes);
      code += generatedCode;
    }

    let blob = new Blob([code], { type: "text/plain;charset=utf-8" });
    let indices: number[] = [];
    for (let i = 0; i < code.length; i++) {
      if (code[i] === ")")
        indices.push(i);
    }

    const codeDialog = this.dialog.open(CodeGeneratorDialogComponent, {
      height: "65%",
      width: "40%",
      data: { code: code },
    });

    codeDialog.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        FileSaver.saveAs(blob, "output.py");
      }
    });

    return code;
  }

  runFile(head: TFNode, tfNodes: TFNode[], links: lineConnectors[], url: string): string {

    if (links != null && links.length > 0) { //TODO: Throw Error
      var graph: TFGraph = new TFGraph(head);

      //If headLink does not have an input throw an error (if - .link == null)
      //Thus if rootInputLinkID == null throw error //TODO: Throw Error

      let rootInputLinkID = head.inputs[0].link;
      let link = links.find(element => element.id == rootInputLinkID);

      //Root will always only be allowed one input
      let rootChildID = link?.origin_id;
      let rootChild = tfNodes.find(element => element.id == rootChildID);
      // while(userVariableNames.length>0){
      //     userVariableNames.pop();
      // }

      if (rootChild) {
        tfNodes.forEach(function (value) { value.visitCount = 0 });
        let generatedCode = graph.generateCode(rootChild, links, tfNodes);
        let file: File = new File([generatedCode], "output.py");
      }
      var savedResponse: string = "";
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
    else {
      //CANNOT GENERATE CODE - no connections
      alert("Code generation cannot be completed, no lines connected");
      return "";
    }
  }
}
import { Injectable } from '@angular/core';
import { Node } from './Node/node';
import {JSONFile} from "@angular/cli/utilities/json-file";
import {TFGraph} from "./tf";

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {
  // NEW DATA STRUCTURE PY FILE IMPLEMENTATION BELOW HERE
  generateFile(head : Node) : File {
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

}

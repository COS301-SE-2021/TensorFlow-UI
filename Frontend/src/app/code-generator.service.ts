import { Injectable } from '@angular/core';
import { Node } from './Node/node';

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {

  codefile : string;

  constructor() {
    let codefile = "";
  }

  sendToFile(codeLine : string) {
    this.codefile += "\n";
    this.codefile += codeLine;
  }

  generateCode(node : Node) {
    switch (node.nodeType) {
      case "variable":
        return this.generateVariable(node);

      case "function":
        return this.generateFunctionCall(node);

      default:
        return "incorrect node type";
    }
  }

  generateFunctionCall(node) {
    let hasChildren = false;
    let child;
    let codeline = "";
    while (hasChildren) {
      this.generateFunctionCall(child);
    }
    codeline += node.code;
    codeline += "(";
    codeline += this.generateCode(node.input);
    codeline += ")";
    this.sendToFile(codeline);
    return codeline;
  }

  generateVariable(node : Node) {
    if (node.createNodeBool) {
      let codeline = "";
      codeline += node.name;
      codeline += " = ";
      codeline += node.data;
      this.sendToFile(codeline);
      node.createNodeBool = false;
      return codeline;
    } else {
      return node.data;
    }
  }
}

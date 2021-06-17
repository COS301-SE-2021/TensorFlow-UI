import { Injectable } from '@angular/core';

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
    switch (node.type) {
      case "variable":
        return this.generateVariable(node);

      case "function":
        return this.generateFunctionCall(node);

      default:
        return "incorrect node type";
    }
  }

  generateFunctionCall(node : Node) {
    let hasChildren = false;
    let child;
    let codeline = "";
    while (hasChildren) {
      this.generateFunctionCall(child);
    }
    codeline += node.code;
    codeline += "(";
    codeline += generateCode(node.input);
    codeline += ")";
    this.sendToFile(codeline);
    return codeline;
  }

  generateVariable(node : Node) {
    let codeline = "";
    codeline += node.name;
    codeline += " = ";
    codeline += node.data;
    this.sendToFile(codeline);
    return codeline;
  }


}

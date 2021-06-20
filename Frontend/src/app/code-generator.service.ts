import { Injectable } from '@angular/core';
import { Node } from './Node/node';

@Injectable({
  providedIn: 'root'
})
export class CodeGeneratorService {

  codefile : string;

  constructor() {
    this.codefile = "";
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
  /**
   * OKAY SO GAME PLAN WITH THIS:
   * Gotta first declare functions (1)
   * Then when declared, we're able to call them
   * So in that case, use the creation flag to determine whether the functions must first be defined before they can be called
   * And yeah that should fix some things
   *
   */
  generateFunctionCall(node) {
    let codeline = "";
    if (!node.children.isEmpty) {
      for (let i = 0; i < node.children.length; i++) {
        this.generateCode(node.children[i]);
      }
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

import { Injectable } from '@angular/core';
import { Node } from './Node/node';
import {JSONFile} from "@angular/cli/utilities/json-file";

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

  createVariables(json) {
    var node = JSON.parse(json);
    var variableDeclaration : String = "";
    for (const child in node) {
      if(child.type.equals("variable")) {
        var thisDeclaration =
          child.name + " = " + child.value + '\n';
        variableDeclaration += thisDeclaration;
      }
    }
    return variableDeclaration;
  }

  createFunctions(json) {
    var node = JSON.parse(json);
    var functionDeclaration : String = "";
    for (const child in node) {
      if(child.type.equals("function")) {
        var inputs : String = "";
        for (const input in child.inputs) {
          inputs += input + ", ";
        }
        inputs = inputs.substring(0, inputs.length - 2);
        var thisDeclaration =
          "def " + child.name + "(" + inputs + "):\n\t";

        thisDeclaration += "result = "

        switch (node.functionType) {
          case "addition":

            for (const input in child.inputs) {
              thisDeclaration += input.name + " + ";
            }

            thisDeclaration += "\n\t"

            break;
          case "subtraction":
            for (const input in child.inputs) {
              thisDeclaration += input.name + " - ";
            }

            thisDeclaration += "\n\t"
            break;

          case "multiplication":
            for (const input in child.inputs) {
              thisDeclaration += input.name + " * ";
            }

            thisDeclaration += "\n\t"
            break;

          case "division":
            for (const input in child.inputs) {
              thisDeclaration += input.name + "/+ ";
            }

            thisDeclaration += "\n\t"
            break;
        }

        thisDeclaration += "return result\n"

        functionDeclaration += thisDeclaration;
      }
    }
    return functionDeclaration;
  }

  createModel(type : string, numLayers : Number, densityUnits : Array<Number>, activationTypes : Array<string>, trainingData : JSONFile | null) {
    var code : string = "";
    var layers : string = "";

    for (let i = 0; i < numLayers; i++) {
      layers.concat("model.add(Dense(units=" + densityUnits[i] + ", activation='" + activationTypes[i] + "))\n)";
    }

    code.concat("model = Sequential()\n" +
      layers +
      "model.compile(loss='binary_crossentropy', optimizer='sgd', metrics='accuracy')"
    )

    return code;
  }

  createCombinedCode(json) {
    var code = "import tensorflow\n" +
      "import pandas as pd\n";
    code += this.createVariables(json);
    code += this.createFunctions(json);
    return code;
  }
}

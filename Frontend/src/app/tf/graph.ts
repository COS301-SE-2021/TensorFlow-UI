import {TFNode} from "./node";

export class TFGraph {
	constructor(public root: TFNode | undefined = undefined) {}

  generateCode(current : TFNode){
	  let stringCode = "";
	  stringCode = this.generateCode(current.leftChild);
    stringCode += this.generateCode(current.leftChild);
    stringCode += current.code();
    return stringCode;
  }
}

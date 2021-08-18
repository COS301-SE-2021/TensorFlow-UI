import {TFNode} from "./node";

export class TFGraph {
	constructor(public root: TFNode | undefined = undefined) {}

  generateCode(current : TFNode | undefined){
    let stringCode = "";
	  if(current != undefined ) {
      stringCode += this.generateCode(current.childOne);
      stringCode += this.generateCode(current.childTwo);
      stringCode += current.code() + "\n";
    }
    return stringCode;
  }
}

export class IntegerVariable extends Node {
  constructor(value : number) {
    super();
    this.name = "integerVariable";
    this.nodeType = "variable";
    this.input = null;
    this.output = null;
    this.data = value;
    this.createNodeBool = false;
  }
}

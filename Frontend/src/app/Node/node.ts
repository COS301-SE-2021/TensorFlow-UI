export class Node{
  public code : string
  public name: string;
  public nodeType: string;
  public input: Node|null;
  public output: Node|null;
  public data: string;
  public createNodeBool: boolean;
  public children : Array<Node>;

  constructor(
    name: string,
    nodeType: string,
    input: Node|null,
    output: Node|null,
    data: string,
    createNodeBool: boolean,
    code : string
  ){
    this.name = name;
    this.nodeType = nodeType;
    this.input = input;
    this.output = output;
    this.data = data;
    this.createNodeBool = createNodeBool;
    this.code = code;
    this.children = new Array<Node>();
  }

  addChild(child : Node) {
    this.children.push(child);
  }
}

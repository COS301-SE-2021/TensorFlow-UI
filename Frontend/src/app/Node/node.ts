export class Node{
  public code : string
  public numParameters : number;

  constructor(
    public name: string,
    public nodeType: string,
    public input: Node|null,
    public output: Node|null,
    public data: string,
    public createNodeBool: boolean
  ){}


}

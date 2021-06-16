export class Node{
  constructor(
    public name: string,
    public nodeType: string,
    public input: Node|null,
    public output: Node|null,
    public data: string,
    public createNodeBool: boolean
  ){}


}

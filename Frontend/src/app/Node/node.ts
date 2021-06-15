export class Node{
  constructor(
    public name: string,
    public nodeType: string,
    public input: Node,
    public output: Node,
    public data: string
  ){}
}

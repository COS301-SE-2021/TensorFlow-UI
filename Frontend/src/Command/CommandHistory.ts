import {Command} from "./Command";

export class CommandHistory{
  private commands: Array<Command>;
  private index = -1;

  constructor(){
    this.commands = []
  }

  public push(c: Command){
    this.index++;
    this.commands[this.index] = c;
    this.commands.splice(this.index,this.commands.length-this.index-1)
    console.log("length="+this.commands.length)
    //console.log("index="+this.index)
  }

  public pop(){
    return this.commands.pop();
  }
}

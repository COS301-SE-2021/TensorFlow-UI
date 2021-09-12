import {Command} from "./Command";

export class CommandHistory{
  private commands: Array<Command>;
  private index = 0;

  constructor(){
    this.commands = new Array<Command>(100)
  }

  public push(c: Command){
    this.commands.push(c);
  }

  public pop(){
    return this.commands.pop();
  }
}

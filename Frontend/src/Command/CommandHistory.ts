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

  public get(){
    if(this.index < 0) return undefined;
    let c = this.commands[this.index];
    console.log("undo index: "+this.index)
    if(this.index > -1){
      this.index--;
    }
    return c;
  }

  public restore(){
    if(this.index < this.commands.length-1){
      this.index++;
      console.log("redo index: "+this.index)
      return this.commands[this.index];
    }
    return undefined;
  }
}

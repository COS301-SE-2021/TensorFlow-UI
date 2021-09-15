import {Command} from "./Command";
import {Store} from "@ngxs/store";
import {CodeGeneratorService} from "../app/code-generator.service";
import {WorkspaceState} from "../Storage/workspace";

export class GenerateCodeCommand extends Command{

  constructor(store: Store) {
    super(store);
  }

  execute(){
    const generator: CodeGeneratorService = new CodeGeneratorService(this.store);
    generator.generateFile(this.store.selectSnapshot(WorkspaceState).rootNode);
    return false;
  }

  undo() {
  }
}

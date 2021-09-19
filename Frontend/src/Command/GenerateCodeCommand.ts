import {Command} from "./Command";
import {Store} from "@ngxs/store";
import {CodeGeneratorService} from "../app/code-generator.service";
import {WorkspaceState} from "../Storage/workspace";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";

export class GenerateCodeCommand extends Command{
  private nav: NavbarComponent
  constructor(store: Store,navbar: NavbarComponent) {
    super(store);
    this.nav = navbar;
  }

  execute(){
    const generator: CodeGeneratorService = new CodeGeneratorService(this.store);
    generator.generateFile(this.store.selectSnapshot(WorkspaceState).rootNode,this.nav.TFNodeList,this.store.selectSnapshot(WorkspaceState).links);
    return false;
  }

  undo() {
  }
}

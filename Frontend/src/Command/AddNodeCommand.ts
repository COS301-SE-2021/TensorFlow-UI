import {Command} from "./Command";
import {Store} from "@ngxs/store";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";
import {NodeStore, TFNode} from "../app/tf";

export class AddNodeCommand extends Command{
  private nav: NavbarComponent
  private component: string;
  private lastNodeCreated: TFNode;

  constructor(store: Store, navbar: NavbarComponent) {
    super(store);
    this.nav = navbar;
  }

  execute() {
    let tfnode: TFNode
    let id: string = Math.random().toString(36).substr(2, 9);

    tfnode = new NodeStore[this.component]();
    tfnode.name = this.component + id;
    const liteGraphNode = this.nav.createLiteNode(this.component, false, tfnode);
    this.nav.createComponentSwitchDefaults(tfnode, liteGraphNode, this.component);
    this.lastNodeCreated = tfnode;
    return true;
  }

  setComponent(c: string){
    this.component = c;
  }

  getNode(){
    return this.lastNodeCreated;
  }

  undo() {
  }
}

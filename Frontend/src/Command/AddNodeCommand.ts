import {Command} from "./Command";
import {Store} from "@ngxs/store";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";
import {NodeStore, TFNode} from "../app/tf";
import {LGraphNode} from "litegraph.js";
import {AddTFNode, UpdateID, UpdateTFNode} from "../Storage/workspace";
import {DeleteNodeCommand} from "./DeleteNodeCommand";

export class AddNodeCommand extends Command{
  private component: string;
  private lastNodeCreated: TFNode;
  private lastLiteNodeCreated: LGraphNode;
  private c = new DeleteNodeCommand(this.store,this.navbar);

  constructor(store: Store, private navbar: NavbarComponent) {
    super(store);
  }

  execute() {
    let tfnode: TFNode
    let id: string = Math.random().toString(36).substr(2, 5);

    tfnode = new NodeStore[this.component]();
    tfnode.name = this.component + id;
    const liteGraphNode = this.navbar.createLiteNode(this.component, false, tfnode);
    tfnode.selector = this.component;
    tfnode.id = liteGraphNode.id;
    tfnode.position = liteGraphNode.pos;
    tfnode.inputs = liteGraphNode.inputs;
    tfnode.outputs = liteGraphNode.outputs;
    this.store.dispatch(new AddTFNode(tfnode));
    tfnode.UIStructure(liteGraphNode,this.navbar);
    this.store.dispatch(new UpdateTFNode(tfnode));
    this.navbar.TFNodeList.push(tfnode);
    this.lastNodeCreated = tfnode;
    this.c.setNode(liteGraphNode);
    this.store.dispatch(new UpdateID(tfnode.id))
    return true;
  }

  setComponent(c: string){
    this.component = c;
  }

  getNode(){
    return this.lastNodeCreated;
  }

  getLiteGraphNode() {
    return this.lastLiteNodeCreated;
  }

  undo() {
    this.c.execute();
  }
}

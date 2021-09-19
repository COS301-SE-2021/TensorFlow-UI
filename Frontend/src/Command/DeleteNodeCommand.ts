import {Command} from "./Command";
import {Store} from "@ngxs/store";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";
import {TFTensor} from "../app/tf/tensor/tensor";
import {LGraphNode} from "litegraph.js";
import {RemoveTFNode, ResetStore} from "../Storage/workspace";
import {ReloadFromStoreCommand} from "./ReloadFromStoreCommand";

export class DeleteNodeCommand extends Command{
  private node: LGraphNode
  constructor(store: Store, private navbar: NavbarComponent) {
    super(store);
  }

  execute() {
    this.backup = this.store.snapshot();

    let nodes = this.navbar.TFNodeList;
    let that = this;
    let tempNode;

    //console.log(this.navbar.TFNodeList)
    nodes.forEach(function(element){
      if(element.id == that.node.id) {
        console.log(element);
        that.store.dispatch(new RemoveTFNode(element))
        tempNode = element;
      }
    });
    this.navbar.graph.remove(this.node);
    let i = this.navbar.TFNodeList.findIndex(element => tempNode.id == element.id)
    this.navbar.TFNodeList.splice(i,1);
    return true;
  }
  undo() {
  }
}

import {Command} from "./Command";
import {Store} from "@ngxs/store";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";
import {LGraphNode} from "litegraph.js";
import {AddTFNode, RemoveTFNode, ResetStore, WorkspaceState} from "../Storage/workspace";
import {TFNode} from "../app/tf";

export class DeleteNodeCommand extends Command{
    private node: LGraphNode
    private tfnode: TFNode
    constructor(store: Store, private navbar: NavbarComponent) {
        super(store);
    }

  execute() {
    this.backup = this.store.selectSnapshot(WorkspaceState).links;

    let nodes = this.navbar.TFNodeList;
    let that = this;

    //console.log(this.navbar.TFNodeList)
    nodes.forEach(function(element){
      if(element.id == that.node.id) {
        console.log(element);
        that.store.dispatch(new RemoveTFNode(element))
        that.tfnode = element;
      }
    });
    this.navbar.graph.remove(this.node);
    let i = this.navbar.TFNodeList.findIndex(element => this.tfnode.id == element.id)
    this.navbar.TFNodeList.splice(i,1);
    return true;
  }

  undo() {
    /*this.store.reset(this.backup)
    this.store.dispatch(new ResetStore(this.backup))
    let c = new ReloadFromStoreCommand(this.store,this.navbar);
    c.execute();*/
      this.navbar.graph.add(this.node)
      this.navbar.TFNodeList.push(this.tfnode)
      this.store.dispatch(new AddTFNode(this.tfnode))
      //this.navbar.reloadCommand.execute();

      const storedLinks = this.backup
      for(let item of storedLinks){
          if(item.target_id == this.node.id || item.origin_id == this.node.id) {
              const targetNodeID = item.target_id;
              const originNodeID = item.origin_id;

              const targetNode = this.navbar.graph.getNodeById(targetNodeID);
              const originNode = this.navbar.graph.getNodeById(originNodeID);

              if (originNode && targetNode) {
                  originNode.connect(item.origin_slot, targetNode, item.target_slot);
              }
          }
      }
  }

  setNode(n: LGraphNode){
    this.node = n;
  }
}

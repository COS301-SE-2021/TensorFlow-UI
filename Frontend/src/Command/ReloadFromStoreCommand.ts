import {Command} from "./Command";
import {Store} from "@ngxs/store";
import * as litegraph from "litegraph.js";
import {WorkspaceState} from "../Storage/workspace";
import {LGraphNode} from "litegraph.js";
import {TFRootNode} from "../app/tf/rootNode/rootNode";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";

export class ReloadFromStoreCommand extends Command{

  constructor(store: Store, private navbar: NavbarComponent) {
    super(store);
  }

  execute(){
    let canvas = new litegraph.LGraphCanvas("#Canvas", this.navbar.graph);
    let importPageCanvas = new litegraph.LGraphCanvas("#ImportCanvas", this.navbar.graph);
    const storedNodes = this.store.selectSnapshot(WorkspaceState).TFNode;
    const nodesLoadedOntoCanvas: LGraphNode[] = [];
    const rootNode = this.store.selectSnapshot(WorkspaceState).rootNode;

    //if else statement to load or create a root node onto the canvass
    if(rootNode==undefined){
      let tensorRoot = new TFRootNode();
      tensorRoot.name = "RootNode";

      const liteGraphNode = this.navbar.createLiteNode("RootNode", false, tensorRoot);
      this.navbar.createRootNodeHelper(tensorRoot, liteGraphNode);
    }
    else{
      let tensorRoot = new TFRootNode();
      tensorRoot.name = "Root";
      nodesLoadedOntoCanvas.push(this.navbar.createLiteNode("RootNode",true,rootNode));
    }

    if(storedNodes.length>0){
      //recreate all these nodes;

      for(let i=0; i<storedNodes.length;++i){
        nodesLoadedOntoCanvas.push(this.navbar.createLiteNode(storedNodes[i].selector,true,storedNodes[i]));
      }

      // recreate all line connectors from memory
      const storedLinks = this.store.selectSnapshot(WorkspaceState).links;

      for(let item of storedLinks){
        const targetNodeID = item.target_id;
        const originNodeID = item.origin_id;

        const targetNode = nodesLoadedOntoCanvas.find(element => element.id === targetNodeID);
        const originNode = nodesLoadedOntoCanvas.find(element => element.id === originNodeID);

        if(originNode && targetNode) {
          originNode.connect(item.origin_slot, targetNode, item.target_slot);
        }
      }
    }
    return false;
  }

  undo() {
  }
}
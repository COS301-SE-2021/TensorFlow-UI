import {Command} from "./Command";
import {Store} from "@ngxs/store";
import * as litegraph from "litegraph.js";
import {AddTFNode, WorkspaceState} from "../Storage/workspace";
import {LGraphNode} from "litegraph.js";
import {TFRootNode} from "../app/tf/rootNode/rootNode";
import {NavbarComponent} from "../app/Components/navbar/navbar.component";
import {GitAPI} from "../app/git-api";
import {NodeStore, TFNode} from "../app/tf";

export class LoadFromImportCommand extends Command{

    public gitAPI: GitAPI;
  constructor(store: Store, private navbar: NavbarComponent) {
    super(store);
      this.gitAPI = GitAPI.getInstance(store);
  }

  execute(){
      if (this.gitAPI.previewData != null && this.gitAPI.previewData.length > 0) {
          try {
              let obj = JSON.parse(this.gitAPI.previewData);
              let canvas = new litegraph.LGraphCanvas("#Canvas", this.navbar.graph);
              let storedNodes = obj.TFNode;
              let nodesLoadedOntoCanvas: LGraphNode[] = [];
              nodesLoadedOntoCanvas.push(this.navbar.LGroot);
              let val = this.store.selectSnapshot(WorkspaceState).TFNode.length;
              if(storedNodes.length>0){
                  //recreate all these nodes;



          for(let i=0; i<storedNodes.length;++i){
              storedNodes[i].id += val;
              let keep = this.navbar.createLiteNode(storedNodes[i].selector,true,storedNodes[i])
            nodesLoadedOntoCanvas.push(keep);
              storedNodes[i].id = keep.id;
              storedNodes[i].inputs = keep.inputs;
              storedNodes[i].outputs = keep.outputs;
              this.store.dispatch(new AddTFNode(storedNodes[i]));
          }

          // recreate all line connectors from memory
          const storedLinks = obj.links;

          for(let i=0; i<storedLinks.length;++i){
              if(storedLinks[i].target_id !=1){
                  const targetNodeID = storedLinks[i].target_id +val;
                  const originNodeID = storedLinks[i].origin_id +val;
                  const targetNode = nodesLoadedOntoCanvas.find(element => element.id === targetNodeID);
                  const originNode = nodesLoadedOntoCanvas.find(element => element.id === originNodeID);
                  if(originNode && targetNode) {
                      originNode.connect(storedLinks[i].origin_slot, targetNode, storedLinks[i].target_slot);
                  }
              }
          }
        }
        this.navbar.lines = this.navbar.graph.list_of_graphcanvas[0].graph.links;
      } catch (e) {
            console.log(e);
            alert("File provided was not constructed by Tensorflow UI");
        }
    } else {
        alert("No file selected for import.")
    }
    return false;
  }

  undo() {
  }
}

import {Command} from "./Command";
import {Store} from "@ngxs/store";
import * as litegraph from "litegraph.js";
import {AddRootNode, WorkspaceState} from "../Storage/workspace";
import {LGraphNode} from "litegraph.js";
import {TFRootNode} from "../app/tf/rootNode/rootNode";
import {NodeStore, TFNode} from "../app/tf";
import {userVariableNames} from "../app/tf/userVariableNames";

export class PopulatePreviewCommand extends Command{
  graph: litegraph.LGraph;
    public project;
  constructor(store: Store, private nav, project) {
    super(store);
    this.project = project;
    this.graph = new litegraph.LGraph();
  }

  execute() {
      console.log(this.project);
      let canvas1 = document.getElementById("previewCanvas") as HTMLCanvasElement;
      let canvas = new litegraph.LGraphCanvas(canvas1, this.graph);
      const storedNodes = this.project.TFNode;
      const nodesLoadedOntoCanvas: LGraphNode[] = [];

    //if else statement to load or create a root node onto the canvass
      let tensorRoot = new TFRootNode();
      tensorRoot.name = "RootNode";

      const liteGraphNode = this.createLiteNode("RootNode", false, tensorRoot);
      this.createRootNodeHelper(tensorRoot, liteGraphNode);

      for(let i=0; i<storedNodes.length;++i){
        nodesLoadedOntoCanvas.push(this.createLiteNode(storedNodes[i].selector,true,storedNodes[i]));
      }
      let title = document.getElementById("previewProjectDescription") as HTMLElement;
      if (title){
          title.innerHTML= this.project.title;
      }
      let description = document.getElementById("previewProjectDescription") as HTMLElement;
      if (description){
          description.innerHTML= this.project.description;
      }
      // recreate all line connectors from memory
      const storedLinks = this.project.links;

      for(let i=0; i<storedLinks.length;++i){
        const targetNodeID = storedLinks[i].target_id;
        const originNodeID = storedLinks[i].origin_id;

        const targetNode = nodesLoadedOntoCanvas.find(element => element.id === targetNodeID);
        const originNode = nodesLoadedOntoCanvas.find(element => element.id === originNodeID);

        if(originNode && targetNode) {
          originNode.connect(storedLinks[i].origin_slot, targetNode, storedLinks[i].target_slot);
        }
      }
  }

  undo() {
  }

    createRootNodeHelper(node: TFNode, liteGraphNode: LGraphNode){
        node.selector = "RootNode";
        node.id = liteGraphNode.id;
        node.position = liteGraphNode.pos;
        node.inputs = liteGraphNode.inputs;
        node.outputs = liteGraphNode.outputs;
    }

    createLiteNode(component: string, loadFromMemory: boolean, tempNode: TFNode): LGraphNode {
        const node = new litegraph.LGraphNode();

        if (!loadFromMemory) {
            node.title = component;
            node.pos = [200, 200];
            tempNode.UIStructure(node,this.nav);
            this.graph.add(node);
            this.graph.start();
        } else {
            node.title = component;
            node.pos = tempNode.position;

            // A temporary node is created to get the structure of the UI structure of the object that has been stored in the state.

            let temp: TFNode;
            if(tempNode.selector=="RootNode"){
                temp = new TFRootNode();
            }
            else{
                temp= new NodeStore[tempNode.selector]();
            }
            temp.widgets = tempNode.widgets;
            temp.UIStructure(node,this.nav);
            temp.name = tempNode.name;
            temp.id = tempNode.id;
            temp.selector = tempNode.selector;
            temp.inputs = tempNode.inputs;
            temp.outputs = tempNode.outputs;
            temp.position = tempNode.position;
            if (temp.name != null) {
                userVariableNames.push(temp.name);
            }

            this.graph.add(node);
            this.graph.start();
        }
        return node;
    }
}

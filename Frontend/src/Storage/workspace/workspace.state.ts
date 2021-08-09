import { State, Action,StateContext, Selector } from '@ngxs/store'
import { NodeData, lineConnectors } from "../../app/node-data";
import { AddNodeData} from "./workspace.actions";

export interface WorkspaceStateModel{
  nodes: NodeData[];
}

@State<WorkspaceStateModel>({
  name: 'workspace',
  defaults:{
      nodes:[{num: 1, name: "TestNode01", x: 0, y: 10, type: "variableNode"} as NodeData],
      // lines:[{start: "TestNode01", end: "TestNode02", line: null}],
  },
})

export class WorkspaceState{

  @Selector()
  static getNodes(state: WorkspaceStateModel){
      return state.nodes;
  }
  // @Selector()
  // static getLines(state: WorkspaceStateModel){
  //   return state.lines;
  // }

  @Action(AddNodeData)
  public addNode(stateContext: StateContext<WorkspaceStateModel>, { node }: AddNodeData){
    const state =stateContext.getState();
    const nodes = [...state.nodes, node];
    stateContext.setState({
      nodes,
    });
  }

}

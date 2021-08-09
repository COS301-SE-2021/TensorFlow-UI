import { State, Action,StateContext, Selector } from '@ngxs/store'
import { NodeData, lineConnectors } from "../../app/node-data";
import {AddLineConnector, AddNodeToStorage, UpdateNodeInStorage , RemoveNodeFromStorage} from "./workspace.actions";
import {append, patch, updateItem} from "@ngxs/store/operators";
import {Injectable} from "@angular/core";

export interface WorkspaceStateModel{
  nodes: NodeData[];
  lines: lineConnectors[];
}

@State<WorkspaceStateModel>({
  name: 'workspace',
  defaults:{
      nodes:[],
      lines: []
      // lines:[{start: "TestNode01", end: "TestNode02", line: null}],
  },
})

@Injectable()
export class WorkspaceState{

  @Selector()
  static getNodes(state: WorkspaceStateModel){
      return state.nodes;
  }
  @Selector()
  static getLines(state: WorkspaceStateModel){
    return state.lines;
  }

  @Action(AddNodeToStorage)
  public addNode(stateContext: StateContext<WorkspaceStateModel>, { node }: AddNodeToStorage){
    const state =stateContext.getState();
    const nodes = [...state.nodes, node];
    stateContext.setState(
      patch({
        nodes: append([node])
      })
    );
  }


}

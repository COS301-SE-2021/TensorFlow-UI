import { State, Action,StateContext, Selector } from '@ngxs/store'
import { NodeData, lineConnectors } from "../../app/node-data";
import {AddLineConnectorToStorage, AddNodeToStorage, UpdateNodeInStorage , RemoveNodeFromStorage} from "./workspace.actions";
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
    stateContext.setState(
      patch({
        nodes: append([node])
      })
    );
  }

  @Action(AddLineConnectorToStorage)
  public addLine(stateContext: StateContext<WorkspaceStateModel>, { line }: AddLineConnectorToStorage){
    stateContext.setState(
      patch({
        lines: append([line])
      })
    );
  }

  @Action(UpdateNodeInStorage)
  public updateNode(stateContext: StateContext<WorkspaceStateModel>, { node }: UpdateNodeInStorage){
    const state =stateContext.getState();
    stateContext.setState(
      patch({
          nodes: updateItem<NodeData>(item => item?.name === node.name, patch(node))
      })
    );
  }

}

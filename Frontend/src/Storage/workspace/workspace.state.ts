import { State, Action,StateContext, Selector } from '@ngxs/store'
import { NodeData, lineConnectors } from "../../app/node-data";
import {
  AddLineConnectorToStorage,
  AddNodeToStorage,
  UpdateNodeInStorage,
  RemoveNodeFromStorage,
  RemoveLineFromStorage, ChangeBooleanValue, RemoveTFNode, AddTFNode, UpdateTFNode
} from "./workspace.actions";
import {append, patch, removeItem, updateItem} from "@ngxs/store/operators";
import {Injectable} from "@angular/core";
import {TFNode, TFOperator} from "../../app/tf";

export interface WorkspaceStateModel{
  nodes: NodeData[];
  lines: lineConnectors[];
  TFNode: TFNode[];
  showWorkspace: Boolean;
}

@State<WorkspaceStateModel>({
  name: 'workspace',
  defaults:{
      nodes:[],
      lines: [],
      TFNode: [],
      showWorkspace: true
      // lines:[{start: "TestNode01", end: "TestNode02", line: null}],
  },
})

@Injectable()
export class WorkspaceState{

  constructor() {
  }

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

  @Action(RemoveNodeFromStorage)
  public removeNode(stateContext: StateContext<WorkspaceStateModel>, { node }: RemoveNodeFromStorage){
    stateContext.setState(
      patch({
        nodes: removeItem<NodeData>(element => element?.name === node)
      })
    )
  }

  @Action(RemoveLineFromStorage)
  public removeLine(stateContext: StateContext<WorkspaceStateModel>, { line }: RemoveLineFromStorage){
    stateContext.setState(
      patch({
        lines: removeItem<lineConnectors>(element => element?.start === line.start && element?.end === line.end)
      })
    )
    console.log(line)
  }

  @Action(ChangeBooleanValue)
  public changeValue(stateContext: StateContext<WorkspaceStateModel>, { element }: ChangeBooleanValue){
    stateContext.setState(
      patch({
        showWorkspace: element
      })
    )
  }
}

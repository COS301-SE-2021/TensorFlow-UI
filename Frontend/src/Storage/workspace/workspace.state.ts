import { State, Action,StateContext, Selector } from '@ngxs/store'
import {NodeData, lineConnectors} from "../../app/node-data";
import {
  AddLineConnectorToStorage,
  AddNodeToStorage,
  UpdateNodeInStorage,
  RemoveNodeFromStorage,
  RemoveLineFromStorage,
  ChangeBooleanValue,
  RemoveTFNode,
  AddTFNode,
  UpdateTFNode,
  AddRootNode,
  AddProjectName,
  AddProjectDescription,
  RemoveLineConnectionOne,
  RemoveLineConnection,
  RemoveLineConnectionTwo,
  UpdateLineConnection
} from "./workspace.actions";
import {append, patch, removeItem, updateItem} from "@ngxs/store/operators";
import {Injectable} from "@angular/core";
import {TFNode, TFOperator} from "../../app/tf";

export interface WorkspaceStateModel{
  //nodes: NodeData[];
  lines: lineConnectors[];
  TFNode: TFNode[];
  showWorkspace: boolean;
  rootNode: TFNode;
  projectName: string;
  projectDescription: string;
}

@State<WorkspaceStateModel>({
  name: 'workspace',
  defaults:{
      //nodes:[],
      lines: [],
      TFNode: [],
      showWorkspace: true,
      rootNode: new TFNode(), //temporary, change later
      projectName: "",
      projectDescription: ""
      // lines:[{start: "TestNode01", end: "TestNode02", line: null}],
  },
})

@Injectable()
export class WorkspaceState{

  constructor() {
  }

  /*@Selector()
  static getNodes(state: WorkspaceStateModel){
      return state.nodes;
  }*/
  @Selector()
  static getLines(state: WorkspaceStateModel){
    return state.lines;
  }
  @Selector()
  static getTFNodes(state: WorkspaceStateModel){
    return state.TFNode;
  }
  @Selector()
  static getRootNode(state: WorkspaceStateModel){
    return state.rootNode;
  }

  /*@Action(AddNodeToStorage)
  public addNode(stateContext: StateContext<WorkspaceStateModel>, { node }: AddNodeToStorage){
    stateContext.setState(
      patch({
        nodes: append([node])
      })
    );
  }*/

  @Action(AddLineConnectorToStorage)
  public addLine(stateContext: StateContext<WorkspaceStateModel>, { line }: AddLineConnectorToStorage){
    stateContext.setState(
      patch({
        lines: append([line])
      })
    );
  }

  /*@Action(UpdateNodeInStorage)
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
  }*/

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

  @Action(AddTFNode)
  public addTFOperator(stateContext: StateContext<WorkspaceStateModel>, { node }: AddTFNode){
    stateContext.setState(
      patch({
        TFNode: append([node])
      })
    )
  }

  @Action(RemoveTFNode)
  public removeTFNode(stateContext: StateContext<WorkspaceStateModel>, { node }: RemoveTFNode){
    stateContext.setState(
      patch({
        TFNode: removeItem<TFNode>(element => element === node)
      })
    )
  }

  @Action(UpdateTFNode)
  public updateTFNode(stateContext: StateContext<WorkspaceStateModel>, { node }: UpdateTFNode){
    stateContext.setState(
      patch({
        TFNode: updateItem<TFNode>(element => element?.name === node.name, node)
      })
    )
  }

  @Action(AddRootNode)
  public addRootNode(stateContext: StateContext<WorkspaceStateModel>, { root }: AddRootNode){
    stateContext.setState(
      patch({
        rootNode: root
      })
    )
  }

  @Action(AddProjectName)
  public addProjectName(stateContext: StateContext<WorkspaceStateModel>, { name }: AddProjectName){
    stateContext.setState(
      patch({
        projectName: name
      })
    )
  }

  @Action(AddProjectDescription)
  public addProjectDescription(stateContext: StateContext<WorkspaceStateModel>, { description }: AddProjectDescription){
    stateContext.setState(
      patch({
        projectDescription: description
      })
    )
  }



  @Action(RemoveLineConnection)
  public removeLineConnection(stateContext: StateContext<WorkspaceStateModel>, {node}: RemoveLineConnection) {
    stateContext.setState(
        patch({
          lines: removeItem<lineConnectors>(element => element?.start === node.toString())
        })
    )
  }

  @Action(RemoveLineConnectionOne)
  public removeLineConnectionOne(stateContext: StateContext<WorkspaceStateModel>, {node}: RemoveLineConnectionOne) {
    stateContext.setState(
        patch({
          lines: removeItem<lineConnectors>(element => element?.start === node.name?.toString() && element?.end !== node?.childTwo?.name?.toString())
        })
    )
  }

  @Action(RemoveLineConnectionTwo)
  public removeLineConnectionTwo(stateContext: StateContext<WorkspaceStateModel>, {node}: RemoveLineConnectionTwo) {
    stateContext.setState(
        patch({
          lines: removeItem<lineConnectors>(element => element?.start === node.name?.toString() && element?.end !== node?.childOne?.name?.toString())
        })
    )
  }

  @Action(UpdateLineConnection)
  public updateLineConnection(stateContext: StateContext<WorkspaceStateModel>, {line}: UpdateLineConnection) {
    stateContext.setState(
        patch({
          lines: updateItem<lineConnectors>(element => element?.start === line.start && element?.end === line.end , patch(line))
        })
    )
  }
}

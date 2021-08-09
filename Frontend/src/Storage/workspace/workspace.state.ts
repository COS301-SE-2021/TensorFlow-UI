import { State, Actions,StateContext, Selector } from '@ngxs/store'
import { NodeData, lineConnectors } from "../../app/node-data";
import { AddNodeData} from "./workspace.actions";

export interface WorkspaceStateModel{
  nodes: NodeData[];
  lines: lineConnectors[];
}

@State<WorkspaceStateModel>({
  name: 'workspace',
  defaults:{
      nodes:[{name: "TestNode1", }];
  }
})

export class WorkspaceState{

}

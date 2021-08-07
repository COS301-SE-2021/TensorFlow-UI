import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { NodeData} from "../node-data";

export interface WorkspaceStateModel{
  nodes: NodeData[];
}

@State<WorkspaceStateModel>({
  name: 'canvas',
  defaults: {
    nodes: [{ num: 0, name: 'TestNode', type: "variable", x: 0, y: 0 } as NodeData],
  },
})
@Injectable()
export class workspaceState{
  @Selector()
  static nodes(state: WorkspaceStateModel) {
    return state.nodes;
  }
}

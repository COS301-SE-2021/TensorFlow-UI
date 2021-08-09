import {lineConnectors, NodeData} from "../../app/node-data";

export class AddNodeData{
  public static readonly type = '[Workspace] Add Node';

  constructor(public node: NodeData) {

  }

}

export class AddLineConnector{
  public static readonly type = '[Workspace] Add Line';

  constructor(public line: lineConnectors) {
  }

}

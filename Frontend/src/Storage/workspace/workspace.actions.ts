import {lineConnectors, NodeData} from "../../app/node-data";

export class AddNodeToStorage{
  public static readonly type = '[Workspace] Add Node';

  constructor(public node: NodeData) {}
}

export class UpdateNodeInStorage{
  public static readonly type = '[Workspace] Update Node';

  constructor(public node: NodeData){}
}

export class RemoveNodeFromStorage{
  public static readonly type = '[Workspace] Remove Node';

  constructor(public node: string) {}
}

export class AddLineConnectorToStorage{
  public static readonly type = '[Workspace] Add Line';

  constructor(public line: lineConnectors) {}
}

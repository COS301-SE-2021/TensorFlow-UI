import {lineConnectors, NodeData, Project} from "../../app/node-data";
import {TFNode, TFOperator} from "../../app/tf";

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

export class RemoveLineFromStorage{
  public static readonly type = '[Workspace] Remove Line';

  constructor(public line: lineConnectors) {}
}

export class AddLineConnectorToStorage{
  public static readonly type = '[Workspace] Add Line';

  constructor(public line: lineConnectors) {}
}

export class ChangeBooleanValue{
  public static readonly type = '[Workspace] Change Boolean';

  constructor(public element: Boolean){}
}

export class AddTFNode{
  public static readonly type = '[Workspace] Add TFNode';

  constructor(public node: TFNode){}
}

export class RemoveTFNode{
  public static readonly type = '[Workspace] Remove TFNode';

  constructor(public node: TFNode){}
}

export class UpdateTFNode{
  public static readonly type = '[Workspace] Update TFNode';

  constructor(public node: TFNode){}
}

export class AddRootNode{
  public static readonly type = '[Workspace] Add RootNode';

  constructor(public root: TFNode){}
}

export class AddProjectName{
  public static readonly type = '[Workspace] Add Project Name';

  constructor(public name: string){}
}

export class AddProjectDescription{
  public static readonly type = '[Workspace] Add Project Description';

  constructor(public description: string){}
}

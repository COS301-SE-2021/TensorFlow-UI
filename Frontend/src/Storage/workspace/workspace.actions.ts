import {lineConnectors, NodeData} from "../../app/node-data";
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

  constructor(public element: boolean){}
}

export class AddTFNode{
  public static readonly type = '[Workspace] Add TFNode';

  constructor(public node: TFNode){}
}

export class RemoveTFNode{
  public static readonly type = '[Workspace] Remove TFNode';

  constructor(public node: TFNode){}
}

export class RemoveAllTFNode{
  public static readonly type = '[Workspace] Remove All TFNode';
  constructor(){}
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

export class RemoveLineConnection {
  public static readonly type = '[Workspace] remove Line';

  constructor(public node: string) {
  }
}

export class UpdateLineConnection {
  public static readonly type = '[Workspace] Update Line';

  constructor(public line: lineConnectors) {
  }
}

export class RemoveLineConnectionOne {
  public static readonly type = '[Workspace] Remove Line1';

  constructor(public node: TFNode) {
  }
}

export class RemoveLineConnectionTwo {
  public static readonly type = '[Workspace] Remove Line2';

  constructor(public node: TFNode) {}
}

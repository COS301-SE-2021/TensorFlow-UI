export interface lineConnectors{
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  sourceNode: NodeData;
  targetNode: NodeData;
}

export interface NodeData {
  num: number
  name: string
  type: string
  connectors: lineConnectors[];
  x: number
  y: number
}

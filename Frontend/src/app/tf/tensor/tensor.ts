import {TFNode} from "../node";
import {LGraphNode} from "litegraph.js";

export abstract class TFTensor extends TFNode {

  protected constructor(
    public data: number | undefined = undefined,
    public name: string | undefined = undefined
  ) {
    super(name, "Tensor", data);
  }

  abstract code();
}

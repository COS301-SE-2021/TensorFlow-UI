import {TFNode, widgetStructure} from "../node";
import {LGraphNode} from "litegraph.js";

export abstract class TFTensor extends TFNode {

    protected constructor(
      public data: number | undefined = undefined,
      public name: string | undefined = undefined
    ) {
      super(name, "Tensor", data);
    }

    // abstract code();

    checkTensorType(value: string){
      let numberToCheck: string = value;

      if(!isNaN(Number(numberToCheck))) {
        //String is a number and no further checks
      }
      else {
        //String is not a number, ensure that it has the correct format.
        let inputArrayCheck: string[] = [];

        inputArrayCheck.push(value);
        console.log(value);
      }
    }
}

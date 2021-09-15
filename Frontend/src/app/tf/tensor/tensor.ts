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

    checkTensorInputType(value: string){
      let numberToCheck: string = value;
      let reg = new RegExp('^(\]|\[|[a-zA-Z0-9])*$') //alphanumeric check

      if(!isNaN(Number(numberToCheck)) || reg.test(value)) {
        //String is a number and no further checks
      }
      else {
        //String is not a number, ensure that it has the correct format.
        let inputArrayCheck: string[] = value.split(',');
        inputArrayCheck.forEach(function(element){
          if(!reg.test(element)){
            alert("Invalid Input, please input as a comma separated list")
          }
        });
        //inputArrayCheck.push(value);
        //console.log(value);
      }
    }

}

import {TFNode, widgetStructure} from "../node";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../Components/navbar/navbar.component";

export abstract class TFTensor extends TFNode {

  protected constructor(
    public data: number | number[] | undefined = undefined,
    public name: string | undefined = undefined
  ) {
    super(name, "Tensor", data);
  }

    // abstract code();

    checkTensorInputType(value: string){
      let numberToCheck: string = value;
      let reg = new RegExp('^(.|\]|\[|[a-zA-Z0-9])*$') //alphanumeric check with [ ] .

      if(!isNaN(Number(numberToCheck)) || reg.test(value)) {
        //String is a number and no further checks
      }
      else {
        //String is not a number, ensure that it has the correct format.
        let inputArrayCheck: string[] = value.split(',');
        inputArrayCheck.forEach(function(element) {
            if (!reg.test(element)) {
                alert("Invalid Input, please input as a comma separated list")
                return false;
            }
            return true;
        })
      }
      return true;
    }


    onesAndZerosUIStructure(node: LGraphNode,navbar?:NavbarComponent){
        const that = this;

        let widgetsData= ["shape","float",this.name];
        let widgetTypes=["shape","dtype?","name"];

        for(let i=0; i<3;++i){
            let widget = this.widgets.find(element => element.type === widgetTypes[i]);
            if(widget!=null)
                widgetsData[i] = widget.value;
        }

        node.addWidget("text",widgetTypes[0],widgetsData[0],function (value){
            if(that.checkIfWidgetTypeIsAVectorArray(value,widgetTypes[0]))
                that.changeWidgetValue(value,widgetTypes[0],navbar);
            else {
                that.resetWidgetValueToLast(widgetTypes[0], node, widgetsData[0]);
            }
        });

        node.addWidget("combo",widgetTypes[1],widgetsData[1],function (value){
            that.changeWidgetValue(value,widgetTypes[1],navbar);
        },{values: ["float","float32","int32","bool","complex64","string"]});

        node.addWidget("text",widgetTypes[2],widgetsData[2],function (value){
            that.changeWidgetValue(value,widgetTypes[2],navbar,node);
        });
        node.addOutput("tf.Tensor","tf.Tensor");

    }

    onesAndZerosCode(type){
        let result="";
        result+=this.widgets.find(element => element.type == "shape")?.value || (alert("the shape argument is required for the "+ type+" function"));
        if(result=="undefined")
            return result;
        let dType = this.widgets.find(element => element.type == "dtype?")?.value;
        if(dType)
            result+=","+dType;

        return `${this.name+ " = tf."+type+"("+result})`;
    }

    genericCreationUIStructure(widgetsData,widgetTypes,node,navbar){

        for(let i=0; i<widgetTypes.length;++i){
            let widget = this.widgets.find(element => element.type === widgetTypes[i]);
            if(widget!=null)
                widgetsData[i] = widget.value;
        }

        for(let i=0; i<widgetTypes.length;++i){
            if(widgetTypes[i]==="shape" || widgetTypes[i]=="shape?"){
                node.addWidget("text",widgetTypes[i],widgetsData[i], (value) => {
                    if(this.checkIfWidgetTypeIsAVectorArray(value,widgetTypes[i]))
                        this.changeWidgetValue(value,widgetTypes[i],navbar);
                    else
                        this.resetWidgetValueToLast(widgetTypes[i],node,widgetsData[i]);
                });
            }
            if(widgetTypes[i]=="dtype" || widgetTypes[i]=="dtype?"){
                node.addWidget("combo",widgetTypes[i],widgetsData[i],(value) => {
                    this.changeWidgetValue(value,widgetTypes[i],navbar);
                },{values: ["float","float32","int32","bool","complex64","string"]});
            }
            if(
                widgetTypes[i]=="numRows" || widgetTypes[i]=="numRows?" ||
                widgetTypes[i]=="numColumns" || widgetTypes[i]=="numColumns?"||
                widgetTypes[i]=="start" || widgetTypes[i]=="start?" ||
                widgetTypes[i]=="stop" || widgetTypes[i]=="stop?" ||
                widgetTypes[i]=="step" || widgetTypes[i]=="step?" ){
                node.addWidget("text",widgetTypes[i],widgetsData[i],(value) => {
                    if(this.checkIfNumber(value))
                        this.changeWidgetValue(value,widgetTypes[i],navbar);
                    else
                        this.resetWidgetValueToLast(widgetTypes[i],node,widgetsData[i]);
                });
            }
            if(widgetTypes[i]=="batchShape" || widgetTypes[i]=="batchShape?"){
                node.addWidget("text",widgetTypes[i],widgetsData[i],(value) => {
                    if(this.isBatchShapeCorrect(value,widgetTypes[i])){
                        this.changeWidgetValue(value,widgetTypes[i],navbar);
                    }
                    else{
                        this.resetWidgetValueToLast(widgetTypes[i],node,widgetsData[i]);
                    }
                });
            }
        }
        node.addWidget("text","name",this.name,(value) => {
            this.changeWidgetValue(value,"name",navbar,node);
        });

    }

    isBatchShapeCorrect(value,type):boolean{
        value = value.trim();
        if(this.checkIfWidgetTypeIsAVectorArray(value,type)){
            let numbersArray = value.split(',');
            if(numbersArray.length<5){
                return true;
            }
        }

        alert("The batchShape property has to be an array of numbers, of max size 4 [number,number,number,number]")
        return false;
    }
}

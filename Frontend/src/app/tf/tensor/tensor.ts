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
      let reg = new RegExp('^( \] | \\. | \\[ |[a-zA-Z0-9])*$') //alphanumeric check with [ ] .
      let alphanumcheck = new RegExp('^([a-zA-Z0-9])+$')

      if(!isNaN(Number(numberToCheck)) || reg.test(value)) {
        //String is a number and no further checks
      }
      else {
        //String is not a number, ensure that it has the correct format.
          try {
              if(value.match('\\[')?.length != value.match("\]")?.length){
                  alert("Wrong number of brackets, please check [ ] brackets.")
                  return false;
              }
              if (value.match('\\[') != null) value = value.replace("[", "");
              if (value.match("\]") != null) value = value.replace("]", "");
          }catch(e){
              console.log(e);
          }
        let inputArrayCheck: string[] = value.split(',');
        inputArrayCheck.forEach(function(element) {
            if(!alphanumcheck.test(element)){
              alert("value in the list not inserted properly, value set to 0");
              element = "0";
            }
            if (!reg.test(element)) {
                alert("Invalid Input, please input as a comma separated list")
                return false;
            }
            return true;
        })
      }
      return true;
    }

    checkIfTensorInputIsCorrect(value: string): boolean{
        let reg = new RegExp('^(\]|\[|[a-zA-Z0-9])*$');
        let alphaNumVariableREG = new RegExp('^([a-zA-Z][a-zA-Z0-9]*)*$');
        let stringRegExp = new RegExp('^("[a-zA-Z][a-zA-Z0-9]*")*$');

        //If value is a number, alphanumeric(variable) value or a string return true;
        if(!isNaN(Number(value)) || alphaNumVariableREG.test(value) || stringRegExp.test(value)) {
            return true;
        }
        else {
            //Assume input is an array, ensure array has correct type
            let inputString = value;
            let stringArrayLongerThan1= false;
            if(inputString.length>1){
                stringArrayLongerThan1= true;
                return this.checkIfArrayIsCorrectType(inputString, alphaNumVariableREG, stringRegExp);
            }
            else{
                alert("Invalid Input, please input as a comma separated list");
                return false;
            }

            // inputArray.forEach(function(element){
            //     console.log(element);
            //     if(!reg.test(element) || !isNaN(Number(value))){
            //         alert("Invalid Input, please input as a comma separated list")
            //     }
            // });
        }
        return true;
    }

    checkIfArrayIsCorrectType(inputString,alphaNumVariableREG,stringRegExp): boolean{

        // console.log(inputString);
        if(inputString.charAt(0)==='[' && inputString.charAt(inputString.length-1)===']'){
            inputString = inputString.substring(1,inputString.length-1);
            let inputArray = inputString.split(',');

            // let openingBracketCount = inputString.match(/[[]/g).length;
            // console.log(inputString);
            let countHelp=0;
            while(inputString.length>0) {
                // console.log(inputString);
                let nextComma = inputString.indexOf(',');
                if(nextComma>-1) {
                    let element = inputString.substring(0, nextComma);
                    // console.log(element);
                    if (element.length > 1 && element.charAt(0) === '[' && element.charAt(element.length - 1) === ']') {
                        this.checkIfArrayIsCorrectType(element, alphaNumVariableREG, stringRegExp);
                    } else if (element.charAt(0) === '[' || element.charAt(0) === ']') {
                        return false;
                    } else if (
                        !(!isNaN(Number(element)) || alphaNumVariableREG.test(element) || stringRegExp.test(element))
                        || element == "") {
                        alert("Invalid Input, please input as a comma separated list")
                        return false;
                    }
                    inputString = inputString.substring(nextComma + 1);
                    // console.log(inputString);

                }
                else{
                    if(
                        !(!isNaN(Number(inputString)) || alphaNumVariableREG.test(inputString) || stringRegExp.test(inputString))
                        || inputString ==""){
                        alert("Invalid Input, please input as a comma separated list")
                        return false;
                    }
                    inputString = "";
                }
                ++countHelp;
                if(countHelp>10){
                    return false;
                }
            }

            // console.log(inputArray);
            // console.log(inputString);
        }
        else{
            alert("Invalid Input, please input as a comma separated list")
            return false;
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

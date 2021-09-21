import {TFTensor} from "../tensor";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";


export class Assign extends TFTensor{
    constructor(public data: number | undefined = undefined,
                public name: string = " ") {
        super(data, name);
    }

    UIStructure(node: LGraphNode,navbar?:NavbarComponent) {
        const that = this;
        node.addWidget("text","constant",0,function (value){
            that.changeWidgetValue(value,"constant");
        });
        node.addWidget("combo","dtype(optional)","float",function (value){
            that.changeWidgetValue(value,"dtype");
        },{values: ["float32","int32","bool","complex64","string"]});
        node.addWidget("text","shape(optional)","shape",function (value){
            that.changeWidgetValue(value,"shape")
        });
        node.addWidget("text","name(optional)","name",function (value){
            that.changeWidgetValue(value,"name")});

        node.addOutput("Value","tf.Tensor");
    }
}
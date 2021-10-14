import {TFOperator} from "../operator";
import {Store} from "@ngxs/store";
import {LGraphNode} from "litegraph.js";
import {NavbarComponent} from "../../../Components/navbar/navbar.component";

export class TFFloorDiv extends TFOperator {
    private language:string="tensorflow";
    constructor(public name: string | undefined = undefined,private store: Store) {
        super(name);
    }

    code(storageLinks,storageNodes) {

        if(this.language=="tensorflow") {
            let res = this.genericArithmeticCode(storageLinks, storageNodes, "FloorDiv");
            return `${this.name + "= tf.math.floordiv(" + res})`;
        }
        else{
            return (this.name+" = torch.div("+
                this.GetNode(storageLinks, storageNodes, this.inputs[0].link,"input","FloorDiv")+","+
                this.GetNode(storageLinks, storageNodes, this.inputs[1].link, "other","FloorDiv")+',*,rounding_mode="floor"'+
                ",out=None)"
            );
        }
    }

    UIStructure(node: LGraphNode,navbar?:NavbarComponent, language?: string) {
        language = "pyTorch";
        if(!language || language==="tensorflow") {
            node.addInput("a", "tf.Tensor");
            node.addInput("b", "tf.Tensor");
            this.createNodeNameWidget(node, navbar);
            node.addOutput("a/b", "tf.Tensor");
        }
        else{
            this.language = language;
            node.addInput("input", "tf.Tensor");
            node.addInput("other", "tf.Tensor");
            node.addOutput("input/other", "tf.Tensor");

            let widgetsData= ['"floor"'];
            let widgetTypes=["rounding_mode"];

            for(let i=0; i<1;++i){
                let widget = this.widgets.find(element => element.type === widgetTypes[i]);
                if(widget!=null)
                    widgetsData[i] = widget.value;
            }
            node.addWidget("combo",widgetTypes[0],widgetsData[0],(value) => {
                this.changeWidgetValue(value,widgetTypes[0],navbar);
            },{values: ['"floor"']});

            this.createNodeNameWidget(node, navbar);
            node.size = [220,node.size[1]]
        }
    }
}

import {TFNode} from "./node";
import {lineConnectors} from "../node-data";
import {userVariableNames} from "./userVariableNames";

export class TFGraph {
	constructor(public root: TFNode | undefined = undefined) {}

    generateCode(current : TFNode, links: lineConnectors[], tfNodes: TFNode[]){
	    let stringCode = "";

	    if(current) {

	        for(let input of current.inputs){

                let nodeInputLinkID = input.link;

                if(nodeInputLinkID!=null){
					let link = links.find(element => element.id == nodeInputLinkID);

					let nodeChildID = link?.origin_id;
					let nodeChild = tfNodes.find(element => element.id == nodeChildID);
					if(nodeChild) {
						stringCode += this.generateCode(nodeChild, links, tfNodes);
					}
				}
                else{
					// stringCode += this.generateCode(current.childOne);
				}
            }

	        stringCode += (<TFNode>current).code(links,tfNodes) + "\n";

	    }
	    return stringCode;
	}


}

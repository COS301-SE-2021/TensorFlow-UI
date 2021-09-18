import {TFNode} from "./node";
import {lineConnectors} from "../node-data";

export class TFGraph {
	constructor(public root: TFNode | undefined = undefined) {}

    generateCode(current : TFNode, links: lineConnectors[], tfNodes: TFNode[]){
	    let stringCode = "";

	    if(current) {
			++current.visitCount;

	        for(let input of current.inputs){
                let nodeInputLinkID = input.link;
                if(nodeInputLinkID!=null){

					if(current.visitCount<(current.inputs.length*3)) {
						let link = links.find(element => element.id == nodeInputLinkID);
						let nodeChildID = link?.origin_id;
						let nodeChild = tfNodes.find(element => element.id == nodeChildID);
						if (nodeChild) {
							stringCode += this.generateCode(nodeChild, links, tfNodes);
							if(stringCode.includes("undefined")){
								return "undefined";
							}
						}
					}
					else{
						alert("An infinite loop has been detected at "+current.name+"!, as a result execution of the code has been halted.");
						return "undefined";
					}
				}
            }

	        stringCode += (<TFNode>current).visitCount > 1 ? "" : (<TFNode>current).code(links,tfNodes) + "\n";
			if(stringCode.includes("undefined")){
				return "undefined";
			}
	    }
	    return stringCode;
	}

}

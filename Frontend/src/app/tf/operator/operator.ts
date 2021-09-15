import {TFNode, widgetStructure} from "../node";

export abstract class TFOperator extends TFNode {
	protected constructor(public name: string | undefined = undefined) {
		super(name, "Operator",undefined);
	}

	getDType(widgets: widgetStructure[]): string{
		for(let widget of widgets){
			if(widget.type === "dtype"){
				return widget.value;
			}
		}
		return "float";
	}

	genericOperatorCode(storageLinks,storageNodes,operatorType):string{
		let parameters: TFNode[] = [];
		let dTypeArray: string[] = [];

		for(let input of this.inputs){
			const link = storageLinks.find(element => element.id == input.link);
			const inputNode = storageNodes.find(element => element.id == link?.origin_id);
			parameters.push(inputNode);
			if(inputNode){
				dTypeArray.push(this.getDType(inputNode.widgets));
			}
			else {
				alert("Both input nodes (a and b) are required for the "+operatorType+" operator");
				return "";
			}
		}
		if(dTypeArray[0] !== dTypeArray[1]){
			alert("The second input tensor. Must have the same dtype as a, for the "+operatorType+" operator");
			return "";
		}

		return <string>parameters[0].name+","+parameters[1].name;
	}

	genericLogicGateOperatorsCode(storageLinks,storageNodes,operatorType):string{
		let parameters: TFNode[] = [];

		for(let input of this.inputs){
			const link = storageLinks.find(element => element.id == input.link);
			const inputNode = storageNodes.find(element => element.id == link?.origin_id);
			parameters.push(inputNode);
			if(inputNode){
				if(this.getDType(inputNode.widgets) !== "bool"){
					alert("Both inputs must be of dtype bool, for the "+operatorType+" operator");
					return "";
				}
			}
			else {
				alert("Both input nodes (a and b) are required for the "+operatorType+" operation");
				return "";
			}
		}

		return <string>parameters[0].name+","+parameters[1].name;
	}

}

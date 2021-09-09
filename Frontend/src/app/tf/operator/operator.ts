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
}

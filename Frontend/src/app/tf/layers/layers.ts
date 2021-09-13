import {TFNode} from "../node";

export abstract class TFLayers extends TFNode {
	protected constructor(public name: string | undefined = undefined) {
		super(name, "Layers",undefined);
	}
}

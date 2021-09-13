import {TFTensor} from "../../tensor/tensor";
import {LGraphNode} from "litegraph.js";
import {TFLayers} from "../layers";

export class TFElu extends TFLayers {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(name);
	}

	code() {
		return `${this.name} = tf.layers.elu(
			${this.widgets.find(element => element.type == "constant")?.value || "0"},
	})`;
	}

	UIStructure(node: LGraphNode) {
		node.addWidget("text", "constant", 0,  (value) => {
			this.changeWidgetValue(value, "constant");
		});
	}
}



//tf.layers.elu (args?) function source
// Exponetial Linear Unit (ELU).
//
// It follows: f(x) = alpha * (exp(x) - 1.) for x < 0, f(x) = x for x >= 0.
//
// Input shape: Arbitrary. Use the configuration inputShape when using this layer as the first layer in a model.
//
// Output shape: Same shape as the input.
//
// References:
//
// Fast and Accurate Deep Network Learning by Exponential Linear Units (ELUs)
// Parameters:
// args (Object) Optional
// alpha (number) Float >= 0. Negative slope coefficient. Defaults to 1.0.
// inputShape ((null | number)[]) If defined, will be used to create an input layer to insert before this layer. If both inputShape and batchInputShape are defined, batchInputShape will be used. This argument is only applicable to input layers (the first layer of a model).
// batchInputShape ((null | number)[]) If defined, will be used to create an input layer to insert before this layer. If both inputShape and batchInputShape are defined, batchInputShape will be used. This argument is only applicable to input layers (the first layer of a model).
// batchSize (number) If inputShape is specified and batchInputShape is not specified, batchSize is used to construct the batchInputShape: [batchSize, ...inputShape]
// dtype ('float32'|'int32'|'bool'|'complex64'|'string') The data-type for this layer. Defaults to 'float32'. This argument is only applicable to input layers (the first layer of a model).
// name (string) Name for this layer.
// trainable (boolean) Whether the weights of this layer are updatable by fit. Defaults to true.
// weights (tf.Tensor[]) Initial weight values of the layer.
// inputDType ('float32'|'int32'|'bool'|'complex64'|'string') Legacy support. Do not use for new code.
// Returns: ELU

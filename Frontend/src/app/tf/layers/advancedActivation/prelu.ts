import {TFTensor} from "../../tensor/tensor";
import {LGraphNode} from "litegraph.js";

export class TFPrelu extends TFTensor {
	constructor(public data: number | undefined = undefined,
				public name: string = " ") {
		super(data, name);
	}

	code() {
		return `${this.name} = tf.layers.prelu(
			${this.widgets.find(element => element.type == "constant")?.value || "0"},
	})`;
	}

	UIStructure(node: LGraphNode) {
		const that = this;
		node.addWidget("text", "constant", 0, function (value) {
			that.changeWidgetValue(value, "constant");
		});
	}
}


//tf.layers.prelu (args?) function source
// Parameterized version of a leaky rectified linear unit.
//
// It follows f(x) = alpha * x for x < 0. f(x) = x for x >= 0. wherein alpha is a trainable weight.
//
// Input shape: Arbitrary. Use the configuration inputShape when using this layer as the first layer in a model.
//
// Output shape: Same shape as the input.
//
// Parameters:
// args (Object) Optional
// alphaInitializer (tf.initializers.Initializer|'constant'|'glorotNormal'|'glorotUniform'|'heNormal'|'heUniform'|'identity'| 'leCunNormal'|'leCunUniform'|'ones'|'orthogonal'|'randomNormal'| 'randomUniform'|'truncatedNormal'|'varianceScaling'|'zeros'|string) Initializer for the learnable alpha.
// alphaRegularizer (Regularizer) Regularizer for the learnable alpha.
// alphaConstraint (tf.constraints.Constraint) Constraint for the learnable alpha.
// sharedAxes (number|number[]) The axes along which to share learnable parameters for the activation function. For example, if the incoming feature maps are from a 2D convolution with output shape [numExamples, height, width, channels], and you wish to share parameters across space (height and width) so that each filter channels has only one set of parameters, set shared_axes: [1, 2].
// inputShape ((null | number)[]) If defined, will be used to create an input layer to insert before this layer. If both inputShape and batchInputShape are defined, batchInputShape will be used. This argument is only applicable to input layers (the first layer of a model).
// batchInputShape ((null | number)[]) If defined, will be used to create an input layer to insert before this layer. If both inputShape and batchInputShape are defined, batchInputShape will be used. This argument is only applicable to input layers (the first layer of a model).
// batchSize (number) If inputShape is specified and batchInputShape is not specified, batchSize is used to construct the batchInputShape: [batchSize, ...inputShape]
// dtype ('float32'|'int32'|'bool'|'complex64'|'string') The data-type for this layer. Defaults to 'float32'. This argument is only applicable to input layers (the first layer of a model).
// name (string) Name for this layer.
// trainable (boolean) Whether the weights of this layer are updatable by fit. Defaults to true.
// weights (tf.Tensor[]) Initial weight values of the layer.
// inputDType ('float32'|'int32'|'bool'|'complex64'|'string') Legacy support. Do not use for new code.
// Returns: PReLU

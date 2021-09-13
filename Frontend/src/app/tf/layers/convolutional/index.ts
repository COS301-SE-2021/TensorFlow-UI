
import {TFLayers} from "../layers";
import {LGraphNode} from "litegraph.js";




















// args (Object)
// filters (number) The dimensionality of the output space (i.e. the number of filters in the convolution).
// kernelSize (number|number[]) The dimensions of the convolution window. If kernelSize is a number, the convolutional window will be square.
// strides (number|number[]) The strides of the convolution in each dimension. If strides is a number, strides in both dimensions are equal.
// 	Specifying any stride value != 1 is incompatible with specifying any dilationRate value != 1.
//
// padding ('valid'|'same'|'causal') Padding mode.
// dataFormat ('channelsFirst'|'channelsLast') Format of the data, which determines the ordering of the dimensions in the inputs.
// 	channels_last corresponds to inputs with shape (batch, ..., channels)
//
// 	channels_first corresponds to inputs with shape (batch, channels, ...).
//
// 	Defaults to channels_last.
//
// dilationRate (number|[number]|[number, number]|[number, number, number]) The dilation rate to use for the dilated convolution in each dimension. Should be an integer or array of two or three integers.
// 	Currently, specifying any dilationRate value != 1 is incompatible with specifying any strides value != 1.
//
// activation ('elu'|'hardSigmoid'|'linear'|'relu'|'relu6'| 'selu'|'sigmoid'|'softmax'|'softplus'|'softsign'|'tanh') Activation function of the layer.
// 	If you don't specify the activation, none is applied.
//
// useBias (boolean) Whether the layer uses a bias vector. Defaults to true.
// kernelInitializer ('constant'|'glorotNormal'|'glorotUniform'|'heNormal'|'heUniform'|'identity'| 'leCunNormal'|'leCunUniform'|'ones'|'orthogonal'|'randomNormal'| 'randomUniform'|'truncatedNormal'|'varianceScaling'|'zeros'|string|tf.initializers.Initializer) Initializer for the convolutional kernel weights matrix.
// biasInitializer ('constant'|'glorotNormal'|'glorotUniform'|'heNormal'|'heUniform'|'identity'| 'leCunNormal'|'leCunUniform'|'ones'|'orthogonal'|'randomNormal'| 'randomUniform'|'truncatedNormal'|'varianceScaling'|'zeros'|string|tf.initializers.Initializer) Initializer for the bias vector.
// kernelConstraint ('maxNorm'|'minMaxNorm'|'nonNeg'|'unitNorm'|string|tf.constraints.Constraint) Constraint for the convolutional kernel weights.
// biasConstraint ('maxNorm'|'minMaxNorm'|'nonNeg'|'unitNorm'|string|tf.constraints.Constraint) Constraint for the bias vector.
// kernelRegularizer ('l1l2'|string|Regularizer) Regularizer function applied to the kernel weights matrix.
// biasRegularizer ('l1l2'|string|Regularizer) Regularizer function applied to the bias vector.
// activityRegularizer ('l1l2'|string|Regularizer) Regularizer function applied to the activation.
// inputShape ((null | number)[]) If defined, will be used to create an input layer to insert before this layer. If both inputShape and batchInputShape are defined, batchInputShape will be used. This argument is only applicable to input layers (the first layer of a model).
// batchInputShape ((null | number)[]) If defined, will be used to create an input layer to insert before this layer. If both inputShape and batchInputShape are defined, batchInputShape will be used. This argument is only applicable to input layers (the first layer of a model).
// batchSize (number) If inputShape is specified and batchInputShape is not specified, batchSize is used to construct the batchInputShape: [batchSize, ...inputShape]
// dtype ('float32'|'int32'|'bool'|'complex64'|'string') The data-type for this layer. Defaults to 'float32'. This argument is only applicable to input layers (the first layer of a model).
// name (string) Name for this layer.
// trainable (boolean) Whether the weights of this layer are updatable by fit. Defaults to true.
// weights (tf.Tensor[]) Initial weight values of the layer.
// inputDType ('float32'|'int32'|'bool'|'complex64'|'string') Legacy support. Do not use for new code.


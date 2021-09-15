import {TFConstant, TFFill, TFLinespace, TFOnes, TFVariable, TFZeros} from "./tensor/common";
import {TFAdd, TFAddN, TFDivide, TFMod, TFMultiply, TFNegative, TFReciprocal, TFScalarMul, TFSigmoid, TFSubtract} from "./operator";
import {TFModel, TFSequential} from "./model/creation";
import {TFAvgPool3D, TFConv1d, TFConv2d, TFConv2dTranspose, TFConv3d, TFConv3dtranspose, TFDepthWiseConv2d, TFDilation, TFMaxPool3d, TFMaxPoolWithArdMax, TFPool, TFSeparableConv2d} from "./operator/convolution";
import {TFDot, TFMatMul, TFNorm, TFOuterProduct, TFTranspose} from "./operator/matrices";
import {Any, TFAll, TFArgMax, TFArgMin, TFBincount, TFDenseBincount, TFLogSumExp, TFMax, TFMean, TFMin, TFProd, TFSum} from "./operator/reduction";
import {
	TFBatchToSpaceND,
	TFBooleanMaskAsync, TFBroadcastTo,
	TFBuffer, TFCast,
	TFClone,
	TFComplex, TFConcat, TFDepthToSpace,
	TFDiag, TFEinsum, TFExpandDims,
	TFEye, TFGather,
	TFImag, TFMirrorPad, TFMultinomial,
	TFOneHot,
	TFOnesLike, TFPad, TFRand, TFRandomGamma, TFRandomNormal, TFRandomUniform,
	TFRange,
	TFReal, TFReshape, TFReverse, TFSetdiff1dAsync, TFSlice, TFSpaceToBatchND, TFSplit, TFSqueeze, TFStack,
	TFTensorOneD, TFTensorThreeD, TFTensorTwoD, TFTile, TFTruncatedNormal, TFUnstack
} from "./tensor";
import {
	TFAbs,
	TFAcos,
	TFAcosh,
	TFAsin,
	TFAsinh,
	TFAtan,
	TFAtan2,
	TFAtanh,
	TFCeil,
	TFClipByValue,
	TFCos,
	TFCosh,
	TFElu,
	TFErf,
	TFExp,
	TFExpm1,
	TFFloor,
	TFIsFinite,
	TFIsInf,
	TFIsNaN,
	TFLeakyRelu,
	TFLog,
	TFLog1p,
	TFLogSigmoid,
	TFNeg,
	TFPrelu,
	TFRelu,
	TFRelu6,
	TFRound,
	TFRsqrt,
	TFSelu,
	TFSign,
	TFSin,
	TFSinh, TFSoftplus, TFSqrt, TFSquare, TFStep, TFTan, TFTanh
} from "./operator/basicMath";
import {
	TFBatchNorm,
	TFLocalResponseNormalization,
	TFLogSoftmax,
	TFMoments,
	TFSoftmax,
	TFSparseToDense
} from "./operator/normilization";
import {TFMovingAverage} from "./operator/movingAverage";
import {
	TFEqual,
	TFGreater,
	TFGreaterEqual,
	TFLess,
	TFLessEqual,
	TFLogicalAnd,
	TFLogicalNot,
	TFLogicalOr, TFLogicalXor, TFNotEqual, TFWhere, TFWhereAsync
} from "./operator/logical";
import {TFBandPart, TFGramSchmidt, TFqr} from "./operator/linearAlgebra";
import {TFDropout} from "./operator/dropout";
import {TFConfusionMatrix, TFInTopAsync, TFTopk, TFUnique} from "./operator/evaluation";
import {
	TFActivation,
	TFAddLoss,
	TFAddWeights,
	TFAlphaDropout,
	TFApply,
	TFAverage,
	TFAveragePooling1d,
	TFAveragePooling2d,
	TFAveragePooling3d,
	TFBatchNormalization,
	TFBuild,
	TFComputeOutputShape,
	TFConcatenate,
	TFCountParams,
	TFCropping2D,
	TFDense,
	TFDepthwiseConv2d,
	TFDispose,
	TFEmbedding,
	TFFlatten,
	TFGaussianDropout,
	TFGaussianNoise,
	TFGetConfig,
	TFGetWeights,
	TFGlobalAveragePooling1d,
	TFInputLayer,
	TFLayerNormalization,
	TFLeakyReLU,
	TFMasking,
	TFMinimum,
	TFPermute,
	TFRepeatVector,
	TFSetWeights,
	TFSpatialDropout1d,
	TFGlobalAveragePooling2d,
	TFThresholdedReLU,
	TFUpSampling2d,
	TFZeroPadding2d,
	TFGlobalMaxPooling1d,
	TFMaxPooling1d,
	TFMaxPooling2d,
	TFMaxPooling3d,
	TFConvLstm2d,
	TFConvLstm2dCell,
	TFGru,
	TFGruCell,
	TFLstm,
	TFLstmCell,
	TFRnn,
	TFSimpleRNN,
	TFSimpleRNNCell,
	TFStackedRNNCells,
	TFBidirectional, TFTimeDistributed
} from "./layers";
import {TFMaxNorm, TFMinMaxNorm, TFNonNeg, TFUnitNorm} from "./constraints";
// import {constraints} from "./constraints";
// import {TFNode} from "./node";
//

export const NodeStore: any = {
	"Add": TFAdd,
	"AddN": TFAddN,
	"Divide": TFDivide,
	"Mod": TFMod,
	"Multiply": TFMultiply,
	"Negative": TFNegative,
	"Reciprocal": TFReciprocal,
	"ScalarMul": TFScalarMul,
	"Sigmoid": TFSigmoid,
	"Subtract": TFSubtract,
	"Model": TFModel,
	"Sequential": TFSequential,
	"AvgPool3D" : TFAvgPool3D,
	"Conv1d": TFConv1d,
	"Conv2d": TFConv2d,
	"Conv2dTranspose": TFConv2dTranspose,
	"Conv3d": TFConv3d,
	"Conv3dtranspose": TFConv3dtranspose,
	"DepthWiseConv2d": TFDepthWiseConv2d,
	"Dilation": TFDilation,
	"MaxPool3d": TFMaxPool3d,
	"MaxPoolWithArdMax": TFMaxPoolWithArdMax,
	"Pool": TFPool,
	"SeparableConv2d": TFSeparableConv2d,
	"Dot": TFDot,
	"MatMul": TFMatMul,
	"Norm": TFNorm,
	"OuterProduct": TFOuterProduct,
	"Transpose": TFTranspose,
	"All": TFAll,
	"Any": Any,
	"ArgMax": TFArgMax,
	"ArgMin": TFArgMin,
	"Bincount": TFBincount,
	"DenseBincount": TFDenseBincount,
	"LogSumExp": TFLogSumExp,
	"Max": TFMax,
	"Mean": TFMean,
	"Min": TFMin,
	"Prod": TFProd,
	"Sum": TFSum,
	"Constant": TFConstant,
	"Fill": TFFill,
	"Linespace": TFLinespace,
	"Ones": TFOnes,
	"Variable": TFVariable,
	"Zeros": TFZeros,
	"Buffer": TFBuffer,
	// "Clone": TFClone,
	"Complex": TFComplex,
	"Diag": TFDiag,
	"Eye": TFEye,
	"OneHot": TFOneHot,
	"OneLike": TFOnesLike,
	"Range": TFRange,
	"Real": TFReal,
	"TensorOneD": TFTensorOneD,
	"TensorThreeD": TFTensorThreeD,
	"TensorTwoD": TFTensorTwoD,
	"TruncatedNormal": TFTruncatedNormal,
	// "ZerosLike": TFZerosLike,
	"Einsum": TFEinsum,
	"Multinomial": TFMultinomial,
	"Rand": TFRand,
	"RandomGamma": TFRandomGamma,
	"RandomNormal": TFRandomNormal,
	"RandomUniform": TFRandomUniform,
	"BooleanMaskAsync": TFBooleanMaskAsync,
	"Concat": TFConcat,
	"Gather": TFGather,
	"Reverse": TFReverse,
	"Slice": TFSlice,
	"Split": TFSplit,
	"Stack": TFStack,
	"Tile": TFTile,
	"Unstack": TFUnstack,
	"BatchToSpaceND": TFBatchToSpaceND,
	"BroadcastTo": TFBroadcastTo,
	"Cast": TFCast,
	"DepthToSpace": TFDepthToSpace,
	"ExpandDims": TFExpandDims,
	"MirrorPad": TFMirrorPad,
	"Pad": TFPad,
	"Reshape": TFReshape,
	"Setdiff1dAsync": TFSetdiff1dAsync,
	"SpaceToBatchND": TFSpaceToBatchND,
	"Squeeze": TFSqueeze,
//	basicMath
	"abs": TFAbs,
	"acos": TFAcos,
	"acosh": TFAcosh,
	"asin": TFAsin,
	"asinh": TFAsinh,
	"atan": TFAtan,
	"atan2": TFAtan2,
	"atanh": TFAtanh,
	"ceil": TFCeil,
	"clipByValue": TFClipByValue,
	"cos": TFCos,
	"cosh": TFCosh,
	"elu": TFElu,
	"erf": TFErf,
	"exp": TFExp,
	"expm1": TFExpm1,
	"floor": TFFloor,
	"isFinite": TFIsFinite,
	"isInf": TFIsInf,
	"isNaN": TFIsNaN,
	"leakyRelu": TFLeakyRelu,
	"log": TFLog,
	"log1p": TFLog1p,
	"logSigmoid": TFLogSigmoid,
	"neg": TFNeg,
	// "prelu": TFPrelu,
	"reciprocal": TFReciprocal,
	"relu": TFRelu,
	"relu6": TFRelu6,
	"round": TFRound,
	"rsqrt": TFRsqrt,
	"selu": TFSelu,
	"sigmoid": TFSigmoid,
	"sign": TFSign,
	"sin": TFSin,
	"sinh": TFSinh,
	"softplus": TFSoftplus,
	"sqrt": TFSqrt,
	"square": TFSquare,
	"step": TFStep,
	"tan": TFTan,
	"tanh": TFTanh,
//	Normilization
	"batchNorm": TFBatchNorm,
	"localResponseNormalization": TFLocalResponseNormalization,
	"logSoftmax": TFLogSoftmax,
	"moments": TFMoments,
	"softmax": TFSoftmax,
	"sparseToDense": TFSparseToDense,
//	MovingAverage
	"movingAverage": TFMovingAverage,
	//	MovingAverage
	"dropout": TFDropout,
//	logical
	"equal": TFEqual,
	"greater": TFGreater,
	"greaterEqual": TFGreaterEqual,
	"less": TFLess,
	"lessEqual": TFLessEqual,
	"logicalAnd": TFLogicalAnd,
	"logicalNot": TFLogicalNot,
	"logicalOr": TFLogicalOr,
	"logicalXor": TFLogicalXor,
	"notEqual": TFNotEqual,
	// "where": TFWhere,
	// "whereAsync": TFWhereAsync,
//	linear Algebra
	"bandPart": TFBandPart,
	"gramSchmidt": TFGramSchmidt,
	"qr": TFqr,
//	evaluation
	"confusionMatrix": TFConfusionMatrix,
	"inTopKAsync": TFInTopAsync,
	"topk": TFTopk,
	"unique": TFUnique,
//	advancedActivation
	// "elu": TFElu, //same name
	"leakyReLU": TFLeakyReLU,
	// "prelu": TFPrelu, //same name
	"reLU": TFRelu,
	// "softmax": TFSoftmax, //same name
	"thresholdedReLU": TFThresholdedReLU,
//	basic layer
	"activation": TFActivation,
	"dense": TFDense,
	// "dropout": TFDropout, duplicate
	"embedding": TFEmbedding,
	"flatten": TFFlatten,
	"permute": TFPermute,
	"repeatVector": TFRepeatVector,
	"reshape": TFReshape,
	"spatialDropout1d": TFSpatialDropout1d,
//	classes
	"apply": TFApply,
	"countParams": TFCountParams,
	"build": TFBuild,
	"getWeights": TFGetWeights,
	"setWeights": TFSetWeights,
	"addWeight": TFAddWeights,
	"addLoss": TFAddLoss,
	"computeOutputShape": TFComputeOutputShape,
	"getConfig": TFGetConfig,
	"dispose": TFDispose,
//  convolutional
	// 	"conv1d": TFConv1d, duplicates
	// 	"conv2d": TFConv2d, duplicates
	// 	"conv2dTranspose": TFConv2dTranspose,
	// 	"conv3d": TFConv3d,
	"cropping2D": TFCropping2D,
	"depthwiseConv2d": TFDepthwiseConv2d,
	// "separableConv2d": TFSeparableConv2d,
	"upSampling2d": TFUpSampling2d,
//	inputLayer
	"inputLayer": TFInputLayer,
//	mask
	"mask": TFMasking,
//	merging
	// 	"add": TFAdd,
	"average": TFAverage,
	"concatenate": TFConcatenate,
	// "dot": TFDot, //duplicate
	// "maximum": TFMax, //duplicate
	"minimum": TFMinimum,
	// "multiply": TFMultiply //duplicate
//	noise
	"alphaDropout": TFAlphaDropout,
	"gaussianDropout": TFGaussianDropout,
	"gaussianNoise": TFGaussianNoise,
//	Normalization
	"batchNormalization": TFBatchNormalization,
	"layerNormalization": TFLayerNormalization,
//	padding
	"zeroPadding2d": TFZeroPadding2d,
//	pooling
	"averagePooling1d": TFAveragePooling1d,
	"averagePooling2d": TFAveragePooling2d,
	"averagePooling3d": TFAveragePooling3d,
	"globalAveragePooling1d": TFGlobalAveragePooling1d,
	"globalAveragePooling2d": TFGlobalAveragePooling2d,
	"globalMaxPooling1d": TFGlobalMaxPooling1d,
	"globalMaxPooling2d": TFGlobalAveragePooling2d,
	"maxPooling1d": TFMaxPooling1d,
	"maxPooling2d": TFMaxPooling2d,
	"maxPooling3d": TFMaxPooling3d,
//	recurrent
	"convLstm2d": TFConvLstm2d,
	"convLstm2dCell": TFConvLstm2dCell,
	"gru": TFGru,
	"gruCell": TFGruCell,
	"lstm": TFLstm,
	"lstmCell": TFLstmCell,
	"rnn": TFRnn,
	"simpleRNN": TFSimpleRNN,
	"simpleRNNCell": TFSimpleRNNCell,
	"stackedRNNCells": TFStackedRNNCells,
//	wrapper
	"bidirectional": TFBidirectional,
	"timeDistributed": TFTimeDistributed,
//	constraints
	"maxNorm": TFMaxNorm,
	"minMaxNorm": TFMinMaxNorm,
	"nonNeg": TFNonNeg,
	"unitNorm": TFUnitNorm
}


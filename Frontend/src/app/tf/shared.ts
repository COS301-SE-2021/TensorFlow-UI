import {TFConstant, TFFill, TFLinspace, TFOnes, TFVariable, TFZeros} from "./tensor/common";
import {TFAdd, TFAddN, TFDivide, TFMod, TFMultiply,TFSubtract} from "./operator";
import {TFModel, TFSequential} from "./model/creation";
import {TFAvgPool3D, TFConv1d, TFConv2d, TFConv2dTranspose, TFConv3d, TFConv3dtranspose, TFDepthWiseConv2d, TFDilation, TFMaxPool3d, TFMaxPoolWithArdMax, TFPool, TFSeparableConv2d} from "./operator/convolution";
import {TFDot, TFMatMul, TFNorm, TFOuterProduct, TFTranspose} from "./operator/matrices";
import {Any, TFAll, TFArgMax, TFArgMin, TFBincount, TFDenseBincount, TFLogSumExp, TFMax, TFMean, TFMin, TFProd, TFSum} from "./operator/reduction";
import {
	TFBatchToSpaceND,
	TFBooleanMaskAsync,
	TFBroadcastTo,
	TFBuffer,
	TFCast,
	TFComplex,
	TFConcat,
	TFDepthToSpace,
	TFDiag,
	TFEinsum,
	TFExpandDims,
	TFEye,
	TFGather,
	TFIdentity,
	TFMirrorPad,
	TFMultinomial,
	TFOneHot,
	TFOnesLike,
	TFPad,
	TFRand,
	TFRandomGamma,
	TFRandomNormal,
	TFRandomUniform,
	TFRange,
	TFReal,
	TFReverse,
	TFSetdiff1dAsync,
	TFSlice,
	TFSpaceToBatchND,
	TFSplit,
	TFSqueeze,
	TFStack,
	TFTensorOneD,
	TFTensorThreeD,
	TFTensorTwoD,
	TFTile,
	TFTruncatedNormal,
	TFUnstack
} from "./tensor";
import {TFAbs, TFAcos, TFAcosh, TFAsin, TFAsinh, TFAtan, TFAtan2, TFAtanh, TFCeil, TFClipByValue, TFCos, TFCosh, TFElu, TFErf, TFExp, TFExpm1, TFFloor, TFIsFinite, TFIsInf, TFIsNaN, TFLeakyRelu, TFLog, TFLog1p, TFLogSigmoid, TFNeg, TFPrelu, TFReciprocal, TFRelu, TFRelu6, TFRound, TFRsqrt, TFSelu, TFSigmoid, TFSign, TFSin, TFSinh, TFSoftplus, TFSqrt, TFSquare, TFStep, TFTan, TFTanh} from "./operator/basicMath";
import {TFBatchNorm, TFLocalResponseNormalization, TFLogSoftmax, TFMoments, TFSoftmax, TFSparseToDense} from "./operator/normilization";
import {TFMovingAverage} from "./operator/movingAverage";
import {TFEqual, TFGreater, TFGreaterEqual, TFLess, TFLessEqual, TFLogicalAnd, TFLogicalNot, TFLogicalOr, TFLogicalXor, TFNotEqual, TFWhere, TFWhereAsync} from "./operator/logical";
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
	TFBidirectional,
	TFTimeDistributed,
	TFReshape, TFLayerConv2d
} from "./layers";
import {TFMaxNorm, TFMinMaxNorm, TFNonNeg, TFUnitNorm} from "./constraints";
import {TFDivideNoNan} from "./operator/arithmetic/divNoNan";
import {TFFloorDiv} from "./operator/arithmetic/floorDiv";
import {TFMaximum} from "./operator/arithmetic/maximum";
import {TFMinimum} from "./operator/arithmetic/minimum";
import {TFPow} from "./operator/arithmetic/pow";
import {TFCumSum} from "./operator/scan";
// import {constraints} from "./constraints";
// import {TFNode} from "./node";
//

export const NodeStore: any = {
	"Add": TFAdd,
	"Add_n": TFAddN,
	"Divide": TFDivide,
	"Divide NoNan": TFDivideNoNan,
	"FloorDiv": TFFloorDiv,
	"Maximum":TFMaximum,
	"Minimum":TFMinimum,
	"Mod": TFMod,
	"Multiply": TFMultiply,
	"Subtract": TFSubtract,
	"Pow":TFPow,
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
	"Reduce All": TFAll,
	"Reduce Any": Any,
	"ArgMax": TFArgMax,
	"ArgMin": TFArgMin,
	// "Bincount": TFBincount,
	// "DenseBincount": TFDenseBincount,
	"Reduce LogSumExp": TFLogSumExp,
	"Reduce Max": TFMax,
	"Reduce Mean": TFMean,
	"Reduce Min": TFMin,
	"Reduce Prod": TFProd,
	"Reduce Sum": TFSum,
	"Constant": TFConstant,
	"Fill": TFFill,
	"Linspace": TFLinspace,
	"Ones": TFOnes,
	"Variable": TFVariable,
	"Zeros": TFZeros,
	"Buffer": TFBuffer,
	"Identity": TFIdentity,
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
	// "Reshape": TFReshape,
	"Setdiff1dAsync": TFSetdiff1dAsync,
	"SpaceToBatchND": TFSpaceToBatchND,
	"Squeeze": TFSqueeze,
//	basicMath
	"Abs": TFAbs,
	"Acos": TFAcos,
	"Acosh": TFAcosh,
	"Asin": TFAsin,
	"Asinh": TFAsinh,
	"Atan": TFAtan,
	"Atan2": TFAtan2,
	"Atanh": TFAtanh,
	"Ceil": TFCeil,
	"ClipByValue": TFClipByValue,
	"Cos": TFCos,
	"Cosh": TFCosh,
	"Elu": TFElu,
	"Erf": TFErf,
	"Exp": TFExp,
	"Expm1": TFExpm1,
	"Floor": TFFloor,
	"IsFinite": TFIsFinite,
	"IsInf": TFIsInf,
	"IsNaN": TFIsNaN,
	"LeakyRelu": TFLeakyRelu,
	"Log": TFLog,
	"Log1p": TFLog1p,
	"LogSigmoid": TFLogSigmoid,
	"Neg": TFNeg,
	// "prelu": TFPrelu,
	"Reciprocal": TFReciprocal,
	"Relu": TFRelu,
	"Relu6": TFRelu6,
	"Round": TFRound,
	"Rsqrt": TFRsqrt,
	"Selu": TFSelu,
	"Sigmoid": TFSigmoid,
	"Sign": TFSign,
	"Sin": TFSin,
	"Sinh": TFSinh,
	"Softplus": TFSoftplus,
	"Sqrt": TFSqrt,
	"Square": TFSquare,
	"Step": TFStep,
	"Tan": TFTan,
	"Tanh": TFTanh,
//	Normilization
	"batchNorm": TFBatchNorm,
	"localResponseNormalization": TFLocalResponseNormalization,
	"logSoftmax": TFLogSoftmax,
	"moments": TFMoments,
	"softmax": TFSoftmax,
	"sparseToDense": TFSparseToDense,
//	MovingAverage
	"MovingAverage": TFMovingAverage,
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
	"Activation": TFActivation,
	"Dense": TFDense,
	// "dropout": TFDropout, duplicate
	"Embedding": TFEmbedding,
	"Flatten": TFFlatten,
	"Permute": TFPermute,
	"RepeatVector": TFRepeatVector,
	"Reshape": TFReshape,
	"SpatialDropout1d": TFSpatialDropout1d,
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
		"Conv1d Layer": TFConv1d,
		"Conv2d Layer": TFLayerConv2d,
	// 	"conv2dTranspose": TFConv2dTranspose,
	// 	"conv3d": TFConv3d,
	"Cropping2D Layer": TFCropping2D,
	"SepthwiseConv2d Layer": TFDepthwiseConv2d,
	// "separableConv2d": TFSeparableConv2d,
	"UpSampling2d Layer": TFUpSampling2d,
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
	// "minimum": TFMinimum,
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
	"unitNorm": TFUnitNorm,
	"CumSum":TFCumSum
}


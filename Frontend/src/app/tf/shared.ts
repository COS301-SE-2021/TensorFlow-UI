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
}


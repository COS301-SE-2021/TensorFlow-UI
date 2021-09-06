import {TFConstant, TFFill, TFLinespace, TFOnes, TFVariable, TFZeros} from "./tensor";
import {
	TFAdd,
	TFAddN,
	TFDivide,
	TFMod,
	TFMultiply,
	TFNegative,
	TFReciprocal,
	TFScalarMul,
	TFSigmoid,
	TFSubtract
} from "./operator";
import {TFRootNode} from "./rootNode/rootNode";

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
	"Constant": TFConstant,
	"Fill": TFFill,
	"Linespace": TFLinespace,
	"Ones": TFOnes,
	"Variable": TFVariable,
	"Zeros": TFZeros,
	"RootNode": TFRootNode()
}

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
import {TFNode} from "./node";
import {TFRootNode} from "./rootNode/rootNode";

//need to update name and naming convention
export function newNode(component: string) {
	switch (component) {
		case "Constant": return new TFConstant();
		case "Variable": return new TFVariable();
		case "Fill": return new TFFill();
		case "Linspace": return new TFLinespace();
		case "Zeros": return new TFZeros();
		case "Ones": return new TFOnes();
		case "Add": return new TFAdd();
		case "Add_n": return new TFAddN();
		case "Divide": return new TFDivide();
		case "Mod": return new TFMod();
		case "Negative": return new TFNegative();
		case "Reciprocal": return new TFReciprocal();
		case "Scalar Multiplication": return new TFScalarMul();
		case "Sigmoid": return new TFSigmoid();
		case "Subtract": return new TFSubtract();
		case "Multiply": return new TFMultiply();
		case "RootNode": return new TFRootNode();
	//	need to add all the extra classes.
	}
	return new TFNode();
}

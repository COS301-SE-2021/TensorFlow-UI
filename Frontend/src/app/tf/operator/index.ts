import {operatorConvolution} from "./convolution";
import {operatorMath} from "./Math";
import {matricesArray} from "./matrices";
import {reductionArray} from "./reduction";

export * from './operator'
export * from './Math'

export const operatorsArray = {
    "name": "operatorsArray",
    "operatorConvolution": operatorConvolution,
    "operatorMath": operatorMath,
    "matricesArray": matricesArray,
    "reductionArray": reductionArray
};
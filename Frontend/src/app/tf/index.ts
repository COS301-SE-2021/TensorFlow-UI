import {modelArray} from "./model";
import {operatorsArray} from "./operator";

export * from "./node";
export * from "./tensor"
export * from "./operator"
export * from "./graph"
export * from "./shared"

export const tensorFlowTypesArray = {
    "name": "tensorFlowTypesArray",
    "operatorsArray": operatorsArray,
    "modelArray": modelArray
};
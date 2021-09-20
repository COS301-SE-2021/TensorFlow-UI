import {commonTensorsArray} from "./common";
import {tensorCreationArray} from "./creation";
import {tensorMatricesArray} from "./matrices";
import {tensorRandomsArray} from "./random";
import {tensorTransformationsArray} from "./transformations";
import {tensorSpliceArray} from "./splicejoin";

export * from './creation'
export * from './transformations'
export * from './matrices'
export * from './random'
export * from './splicejoin'

export const tensorsArray = {
    "Common": commonTensorsArray,
    "Creation": tensorCreationArray,
    "Matrices": tensorMatricesArray,
    "Random": tensorRandomsArray,
    "SpliceJoin": tensorSpliceArray,
    "Transformation": tensorTransformationsArray
}
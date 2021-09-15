import { TFMaxNorm } from './maxNorm'
import {TFMinMaxNorm} from "./minMaxNorm";
import {TFUnitNorm} from "./unitNorm";
import {TFNonNeg} from "./nonNeg";

export * from './maxNorm'
export * from './minMaxNorm'
export * from './nonNeg'
export * from './unitNorm'

// export const constraints: any = {
// 	"maxNorm": TFMaxNorm,
// 	"minMaxNorm": TFMinMaxNorm,
// 	"nonNeg": TFNonNeg,
// 	"unitNorm": TFUnitNorm
// }

export const constraints = [
	"maxNorm",
	"minMaxNorm",
	"nonNeg",
	"unitNorm"
]

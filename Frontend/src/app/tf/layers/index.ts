import {advancedActivation} from "./advancedActivation";
import {layerClasses} from "./classes";
import {basic} from "./basic";
import {convolutional} from "./convolutional";
import {layerInput} from "./inputs";
import {mask} from "./mask";
import {merge} from "./merge";
import {noise} from "./noise";
import {normalization} from "./normalization";
import {pooling} from "./pooling";
import {recurrent} from "./recurrent";
import {wrapper} from "./wrapper";
import {padding} from "./padding";

export * from './advancedActivation'
export * from './classes'
export * from './basic'
export * from './convolutional'
export * from './inputs'
export * from './mask'
export * from './merge'
export * from './noise'
export * from './normalization'
export * from './padding'
export * from './pooling'
export * from './recurrent'
export * from './wrapper'

export const layersArray = {
	"advancedActivation": advancedActivation,
	"layerClasses": layerClasses,
	"basic": basic,
	"convolutional": convolutional,
	"layerInput": layerInput,
	"mask": mask,
	"merge": merge,
	"noise": noise,
	"normalization": normalization,
	"padding": padding,
	"pooling": pooling,
	"recurrent": recurrent,
	"wrapper": wrapper
}

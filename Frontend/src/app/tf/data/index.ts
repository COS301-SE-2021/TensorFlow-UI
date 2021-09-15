import {dataClasses} from "./classes";
import {dataCreation} from "./creation";
import {dataOperations} from "./operations";

export * from './data'
export * from './classes'
export * from './creation'
export * from './operations'

export const dataList = {
	"classes": dataClasses,
	"creation": dataCreation ,
	"operations": dataOperations
}

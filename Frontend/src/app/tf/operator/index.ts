import {operatorConvolution} from "./convolution";
import {matricesArray} from "./matrices";
import {reductionArray} from "./reduction";
import {basicMath} from "./basicMath";
import {dropout} from "./dropout";
import {evaluation} from "./evaluation";
import {linearAlgebra} from "./linearAlgebra";
import {logical} from "./logical";
import {movingAverage} from "./movingAverage";
import {normilization} from "./normilization";
import {operatorImages} from "./images";
import {operatorRNN} from "./rnn";
import {operatorScan} from "./scan";
import {operatorArithmetic} from "./arithmetic";

export * from './operator'
export * from './arithmetic'

export const operatorsArray = {
    "name": "operatorsArray",
    "operatorConvolution": operatorConvolution,
    "operatorArithmetic": operatorArithmetic,
    "matricesArray": matricesArray,
    "reductionArray": reductionArray,
    "basicMath": basicMath,
    "dropout": dropout,
    "evaluation": evaluation,
    "linearAlgebra": linearAlgebra,
    "logical": logical,
    "movingAverage": movingAverage,
    "normilization": normilization,
    "operatorImages": operatorImages,
    "operatorRNN": operatorRNN,
    "operatorScan": operatorScan
};

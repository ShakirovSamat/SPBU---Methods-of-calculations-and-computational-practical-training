export interface IErrorObject {
    m?: {
        type: string;
        message: string;
    },
    h?: {
        type: string;
        message: string;
    },
    x0?: {
        type: string;
        message: string;
    }
};

export interface IPoint {
    x: number,
    y: number,
};

export interface IResult {
    x: number,
    y: number,
    firstDerivative: number,
    AbsDiffFirstDerivative: number,
    accFirstDerivative: number,
    AbsDiffaccFirstDerivative: number,
    secondDerivative: number,
    AbsDiffSecondDerivative: number,
    moreAccFirstDerivative: number,
    moreACcSecondDerivative: number,
    AbsDiffMoreAccFirstDerivative: number,
    AbsDiffMoreAccSecondDerivative: number,
}

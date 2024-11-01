import { IPoint } from "./types";

export const getFunctionValues = (f: (value: number) => number, m: number, x0: number, h: number): IPoint[] =>  {
    const points = [];
    for (let i = 0; i < m + 1; ++ i) {
        points.push({
            x: x0 + h * i,
            y: f(x0 + h * i),
        });
    }

    return points;
};

export const getFirstDerivatives = (points: IPoint[]) => {
    const derivatives = [];

    const h = (points[2].x - points[1].x);

    derivatives[0] = (-3 * points[0].y + 4 * points[1].y - points[2].y) / (2 * h);

    for(let i = 1; i < points.length - 1; ++i) {
        derivatives[i] = (points[i + 1].y - points[i - 1].y) / (2 *h);
    }

    const len  = points.length - 1;
    derivatives[len] = (3 * points[len].y - 4 * points[len - 1].y + points[len - 2].y) / (2 * h);

    return derivatives;
};

export const getAccFirstDerivative = (points: IPoint[]) => {
    const derivatives = [];

    const h = points[2].x - points[1].x;

    derivatives[0] = (1 / (12 * h)) * (-25 * points[0].y + 48 * points[1].y - 36 * points[2].y + 16 * points[3].y - 3 * points[4].y);
    derivatives[1] = (1 / (12 * h)) * (-3 * points[0].y - 10 * points[1].y + 18 * points[2].y - 6 * points[3].y + points[4].y);

    for (let i = 2; i < points.length - 2; ++i) {
        derivatives[i] = (1 / (12 * h)) * (points[i - 2].y - 8 * points[i - 1].y + 8 * points[i + 1].y - points[i + 2].y);
    }

    const len = points.length - 1;

    derivatives[len - 1] = (1  / (12 * h)) * (3 * points[len].y + 10 * points[len - 1].y - 18 * points[len - 2].y + 6 * points[len -3].y - points[len - 4].y);
    derivatives[len] = (1 / (12 * h)) * (25 * points[len].y - 48 * points[len - 1].y + 36 * points[len - 2].y - 16 * points[len - 3].y + 3 * points[len - 4].y);

    return derivatives;
};

export const getSecondDerivatives = (points: IPoint[]) => {
    const derivatives = [];

    const h = points[2].x - points[1].x;

    derivatives[0] = (2 * points[0].y - 5 * points[1].y + 4 * points[2].y - points[3].y) / (h**2);

    for (let i = 1; i < points.length - 1; ++i) {
        derivatives[i] = (points[i + 1].y - 2 * points[i].y + points[i - 1].y) / (h**2);
    }

    const len = points.length - 1;
    derivatives[len] = (2 * points[len].y - 5 * points[len - 1].y + 4 * points[len - 2].y - points[len - 3].y) / (h**2);

    return derivatives;
};

export const getMoreAccurateFirstDerivatives = (f: (value: number) => number, m: number, x0: number, h: number) => {
    const points1 = getFunctionValues(f, m * 2, x0, h / 2);
    const points2 = getFunctionValues(f, m, x0, h);

    const derivatives1 = getFirstDerivatives(points1);
    const derivatives2 = getFirstDerivatives(points2);

    const derivatives = []

    for (let i = 0; i < derivatives1.length; ++i) {
        derivatives[i] =  ((4 * derivatives1[i * 2]) - derivatives2[i]) / 3;
    }

    return derivatives;
};

export const getMoreAccurateSecondDerivatives = (f: (value: number) => number, m: number, x0: number, h: number) => {
    const points1 = getFunctionValues(f, m * 2, x0, h / 2);
    const points2 = getFunctionValues(f, m, x0, h);

    const derivatives1 = getSecondDerivatives(points1);
    const derivatives2 = getSecondDerivatives(points2);

    const derivatives = []

    for (let i = 0; i < derivatives1.length; ++i) {
        derivatives[i] =  ((4 * derivatives1[i * 2]) - derivatives2[i]) / 3;
    }

    return derivatives;
};

import { IPoint } from "./types";

export const getFunctionValues = (f: (value: number) => number, m: number, x0: number, h: number): IPoint[] =>  {
    const points = [];
    for (let i = 0; i < m + 1; ++ i) {
        points.push({
            x: x0 + h * i,
            y: f(x0 + h * i),
        });
    }
    console.log(points);
    return points;
};
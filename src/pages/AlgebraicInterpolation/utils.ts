import { IPoint } from "./types";

export const f = (x: number) => {
    return Math.exp(x) - x;
}

export const getPoints = (count: number, leftBorder: number, rightBorder: number) => {
    const points = []
    for (let i = 0; i < count; ++i) {
        const x =leftBorder + i * (rightBorder- leftBorder) / count;
        points.push({
            x: x,
            y: f(x),
        });
    }

    return points;
};

export const  getNearestPoints = (x: number, n: number, points: IPoint[]) => {
    points.sort((a, b) => Math.abs(x - a.x) - Math.abs(x - b.x));
    return points.slice(0, n);
};

export const findValueByLagrange = (x: number, points: IPoint[]) => {
    const w = (number: number, k: number) => {
        let value = 1;
        let i = 0;
        while (i < points.length) {
            if (i == k) {
                i += 1;
                continue;
            }
    
            value *= (number - points[i].x);
            i += 1;
        }

        return value;
    }

    let value = 0;
    for (let i = 0; i < points.length; ++i) {
        value += w(x, i) / w(points[i].x, i) * points[i].y;
    }

    return value;
};

export const getAbsoluteDiff = (x: number ,y: number) => {
    return Math.abs(f(x) - y);
};

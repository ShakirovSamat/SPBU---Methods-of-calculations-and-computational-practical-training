export const separateRoots = (equation: (x: number) => number, A: number, B: number, N: number) => {
    const segments = [];
    const h = (B - A) / N;

    let i = 1;
    while (true) {
        if (h * i >= B - A) {
            break;
        }

        if (equation(A + h * (i - 1)) * equation(A + h * i) <= 0){
            segments.push([A + h * (i - 1), A + h * i]);
        }

        i += 1;
    }

    return segments;
};

export const bisection = (equation: (x: number) => number, segment: number[], epsilon: number ) => {
    let a = segment[0];
    let b = segment[1];
    let steps = 0
    while (true) {
        if ((b - a) / 2 <= epsilon) {
            break;
        }

        steps++;

        const h = a + (b - a) / 2;

        if ((equation(a) * equation(h)) <= 0){
            b = h;
        }
        else if ((equation(b) * equation(h)) <= 0){
            a = h;
        }
    }

    return {
        root: b - ((b - a) / 2),
        steps: steps,
        lastSegmentWeight: b - a,
    };
};

export const tangents = (f: (X: number) => number, f2: (x: number) => number, x: number, epsilon: number)=>  {  
    let steps = 0;
    let currentX = x;
    let previousX = x;
    do {
        previousX = currentX;
        currentX = previousX - f(previousX) / f2(previousX);
        steps++;
    } while (Math.abs(currentX - previousX) > epsilon);

    return {
        root: currentX,
        steps:steps,
    };
};

export const tangentsModified = (f: (X: number) => number, f2: (x: number) => number, x: number, epsilon: number)=>  {
    let steps = 0;
    let currentX = x;
    let previousX = x;
    do {
        previousX = currentX;
        currentX = previousX - f(previousX) / f2(x);
        steps++;
    } while (Math.abs(currentX - previousX) > epsilon);

    return {
        root: currentX,
        steps: steps,
    };
};

export const secant = (f: (x: number) => number, x0: number, x1: number, epsilon: number) => {
    let steps = 0;
    let currentX = x1;
    let previousX = x0;

    do {
        const temp = currentX;
        currentX = temp - f(temp) / (f(temp) - f(previousX)) * (temp - previousX);
        previousX = temp;
        steps++;
    } while (Math.abs(currentX - previousX) > epsilon);

    return {
        root: currentX,
        steps: steps,
    };
};

export type TResult = {
  root: number,
  startApproximation: number | number[],
  solution: number,
  steps: number,
  solutionDiff: number,
}

export type TBisectionResult = {
    lastSegmentWeight: number,
} & TResult;
import { useState } from 'react';
import './index.module.css'
import { Button, FormItem, Input } from '@vkontakte/vkui'
import { bisection, secant, separateRoots, tangents, tangentsModified } from './utils';

type TResult = {
  root: number,
  startApproximation: number | number[],
  solution: number,
  steps: number,
  solutionDiff: number,
}

type TBisectionResult = {
    lastSegmentWeight: number,
} & TResult;

export const NonliniearEquationPage = () => {
  const [A, setA] = useState<number>(0);
  const [B, setB] = useState<number>(0);
  const [N, setN] = useState<number>(0);
  const [epsilon, setEpsilon] = useState<number>(0);
  const [segments, setSegments] = useState<number[][]>();
  const [bisectionsResults, setBisectionsResults] = useState<TBisectionResult[]>();
  const [tangentsResults, setTangentsResults] = useState<TResult[]>();
  const [tangentsModifiedResults, setTangentsModifiedResults] = useState<TResult[]>();
  const [secantsResults, setSecantsResults] = useState<TResult[]>();

  const f = (x: number) => {
    return Math.cos(3 * x) - x**3;
  }

  const f2 = (x: number) => {
    return -3 * Math.sin(3* x) - 3* (x**2);
  } 

  const onClick = () => {
    const segments = separateRoots(f, A, B, N);
    setSegments(segments);

    setBisectionsResults(
      segments.map((segment, index) => {
        const result = bisection(f, segment, epsilon)
        return ({
            ...result,
            startApproximation: segments[index][0] + ((segments[index][1] - segments[index][0]) / 2),
            solution: f(result.root),
            solutionDiff: Math.abs(f(result.root) - 0),
          });
      })
    );

    setTangentsResults(
      segments.map((segment) => {
        const center = segment[0] + ((segment[1] - segment[0]) / 2);
        const result = tangents(f, f2, center, epsilon);
        return ({
          ...result,
          startApproximation: center,
          solution: f(result.root),
          solutionDiff: Math.abs(f(result.root) - 0),
        });
      })
    );
    
    setTangentsModifiedResults(
      segments.map((segment) => {
        const center = segment[0] + ((segment[1] - segment[0]) / 2);
        const result = tangentsModified(f, f2, center, epsilon);
        return ({
          ...result,
          startApproximation: center,
          solution: f(result.root),
          solutionDiff: Math.abs(f(result.root) - 0),
        });
      })
    );
    
  setSecantsResults(
      segments.map((segment) => {
        const result = secant(f, segment[0], segment[1], epsilon);
        return ({
          ...result,
          startApproximation: segment,
          solution: f(result.root),
          solutionDiff: Math.abs(f(result.root) - 0),
        });
      })
    );
  }

  return (
    <>
      <form style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
        <h2>Численные методы решения нелинейных уравнений</h2>
        <h3>Уравнение: cos(3x) - x^3</h3>
        <div style={{display: 'flex', gap: 20, justifyContent: 'center' }}>
          <FormItem top='A'>
            <Input onChange={(e) => setA(Number(e.target.value))}/>
          </FormItem>
          <FormItem top='B'>
            <Input onChange={(e) => setB(Number(e.target.value))}/>
          </FormItem>
        </div>
        <FormItem top='N'>
            <Input onChange={(e) => setN(Number(e.target.value))}/>
        </FormItem>
        <FormItem top='Эпсилон'>
            <Input onChange={(e) => setEpsilon(Number(e.target.value))}/>
          </FormItem>
        <Button style={{marginTop: 20}} onClick={() => onClick()}>Найти корни</Button>
      </form>
        <div>
          {segments &&
            <>
              <h3>Отделение корней</h3>
              <div style={{textAlign: 'left'}}>Количество найденных отрезков: {segments?.length}</div>
            </>
          }
        <div style={{display: 'flex'}}>
          {segments && segments.map((root) => {
            return (
              <p style={{paddingRight: 10}}>[{root[0]}; {root[1]}]</p>
            );
          })}
          </div>
        </div>

        {bisectionsResults && <h3>Метод бисекции</h3>}
        {bisectionsResults && bisectionsResults.map((bisection) => {
          return (
            <div style={{padding: 20, display: 'flex', flexFlow: 'column', textAlign: 'left'}}>
              <p style={{textAlign: 'center'}}>Точка: {bisection.root}</p>
              <p>Начальное приблежение к корню: {bisection.startApproximation}</p>
              <p>Количество шагов: {bisection.steps}</p>
              <p>Приближённое решение: {bisection.solution} </p>
              <p>Длина последнего отрезка: {bisection.lastSegmentWeight}</p>
              <p>Абсолютная величина невязки: {bisection.solutionDiff}</p>
            </div>
          );
        })}

        {tangentsResults && <h3>Метод Ньютона</h3>}
        {tangentsResults && tangentsResults.map((bisection) => {
          return (
            <div style={{padding: 20, display: 'flex', flexFlow: 'column', textAlign: 'left'}}>
              <p style={{textAlign: 'center'}}>Точка: {bisection.root}</p>
              <p>Начальное приблежение к корню: {bisection.startApproximation}</p>
              <p>Количество шагов: {bisection.steps}</p>
              <p>Приближённое решение: {bisection.solution} </p>
              <p>Абсолютная величина невязки: {bisection.solutionDiff}</p>
            </div>
          );
        })}

        {tangentsModifiedResults && <h3>Модифицированный метод Ньютона</h3>}
        {tangentsModifiedResults && tangentsModifiedResults.map((bisection) => {
          return (
            <div style={{padding: 20, display: 'flex', flexFlow: 'column', textAlign: 'left'}}>
              <p style={{textAlign: 'center'}}>Точка: {bisection.root}</p>
              <p>Начальное приблежение к корню: {bisection.startApproximation}</p>
              <p>Количество шагов: {bisection.steps}</p>
              <p>Приближённое решение: {bisection.solution} </p>
              <p>Абсолютная величина невязки: {bisection.solutionDiff}</p>
            </div>
          );
        })}

        {secantsResults && <h3>Метод Секущих</h3>}
        {secantsResults && secantsResults.map((bisection) => {
          return (
            <div style={{padding: 20, display: 'flex', flexFlow: 'column', textAlign: 'left'}}>
              <p style={{textAlign: 'center'}}>Точка: {bisection.root}</p>
              <p>Начальное приблежение к корню: {bisection.startApproximation}</p>
              <p>Количество шагов: {bisection.steps}</p>
              <p>Приближённое решение: {bisection.solution} </p>
              <p>Абсолютная величина невязки: {bisection.solutionDiff}</p>
            </div>
          );
        })}
    </>
  )
}


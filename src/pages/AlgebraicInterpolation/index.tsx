import { Button, FormItem, Input } from '@vkontakte/vkui';
import { useState } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { findValueByLagrange, getAbsoluteDiff, getNearestPoints, getPoints } from './utils';
import { IPoint } from './types';
import styles from './index.module.css';

export const AlgebraicInterpolationPage = () => {
    const [m, setM] = useState<number>(0);
    const [a, setA] = useState<number>(0);
    const [b, setB] = useState<number>(0);
    const [x, setX] = useState<number>(0);
    const [n, setN] = useState<number>(0);
    const [error, setError] = useState<string>();   
    
    const [points, setPoints] = useState<IPoint[]>();
    const [nearestPoints, setNearestPoints] = useState<IPoint[]>();
    const [result, setResult] = useState<number>();
    const [diff, setDiff] = useState<number>();

    const onClick = () => {
        if (m < n) {
            setError('badN');
        }
        else {
            setError('');
            const points = getPoints(m, a, b);
            const nearestPoints = getNearestPoints(x, n, points || []);
            const result = findValueByLagrange(x, nearestPoints);
            const diff = getAbsoluteDiff(x, result);
            setNearestPoints(nearestPoints);
            setPoints(points);
            setResult(result);
            setDiff(diff);           
        }
    }
    return (
        <>
            <h2>Задача алгебарического интерполирования</h2>
            <h4>Вариант №3 e(x) - x</h4>
            
            <form>
                <div className={styles.formBlock}>
                    <FormItem top='Число значений в таблице: m'>
                     <Input onChange={(e) => setM(Number(e.target.value))}/>
                    </FormItem>
                    <FormItem top='Левая граница отрезка: a'>
                        <Input onChange={(e) => setA(Number(e.target.value))}/>
                    </FormItem>
                    <FormItem top='Правая граница отрезка: b'>
                        <Input onChange={(e) => setB(Number(e.target.value))}/>
                    </FormItem>
                </div>
                <div className={styles.formBlock}>
                    <FormItem top='Точка интерполирвоания: x'>
                     <Input onChange={(e) => setX(Number(e.target.value))}/>
                    </FormItem>
                    <FormItem top='Степень интерполяционного многочелна: n (n <= m)' status={error == 'badN' ? 'error' : 'default'} bottom={error == 'badN' ? 'Число n должно быть меньше числа m': ''}>
                        <Input onChange={(e) => setN(Number(e.target.value))}/>
                    </FormItem>
                </div>
                <Button onClick={onClick}>Вычислить</Button>
            </form>
            <div className={styles.contentContainer}>
                <div>
                    {points && <h3>Исходная таблица значений функции</h3>}
                    <div className={styles.pointsContainer} style={{ maxHeight: 100 * m / 3}}>
                        {points && points.map((point, index) => {
                            return (
                                <div className={styles.pointBlock}>
                                    <p>{index + 1})</p>
                                    <div className={styles.coordinateBlock}>
                                        <div>x: {point.x}</div>
                                        <div>y: {point.y}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    {nearestPoints && <h3>Набор узлов , ближайших к точке x, по которым будет строиться интерполяционный многочлен</h3>}
                    <div className={styles.pointsContainer} style={{ maxHeight: 100 * m / 3}}>
                        {nearestPoints && nearestPoints.map((point, index) => {
                            return (
                                <div className={styles.pointBlock}>
                                    <p>{index + 1})</p>
                                    <div className={styles.coordinateBlock}>
                                        <div>x: {point.x}</div>
                                        <div>y: {point.y}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    {result && <h3>Значение интерполяционного многочлена</h3>}
                    {result && <div>{result}</div>}
                </div>
                <div style={{marginBottom: 50}}>
                    {diff && <h3>Значение абсолютной фактической погрешности</h3>}
                    {diff && <div>{diff}</div>}
                </div>
            </div>
        </>
    );
}
import { Button, FormItem, Input } from '@vkontakte/vkui';
import { useState } from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import { findValueByLagrange, getAbsoluteDiff, getNearestPoints, getPoints } from './utils';
import { IPoint } from './types';

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
            <h4>Вариант №3</h4>
            <form>
                <div style={{display: 'flex', gap: 20, justifyContent: 'center',  marginBottom: 20}}>
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
                <div style={{display: 'flex', gap: 20, justifyContent: 'center',  marginBottom: 20}}>
                    <FormItem top='Точка интерполирвоания: x'>
                     <Input onChange={(e) => setX(Number(e.target.value))}/>
                    </FormItem>
                    <FormItem top='Степень интерполяционного многочелна: n (n <= m)' status={error == 'badN' ? 'error' : 'default'} bottom={error == 'badN' ? 'Число n должно быть меньше числа m': ''}>
                        <Input onChange={(e) => setN(Number(e.target.value))}/>
                    </FormItem>
                </div>
                <Button onClick={onClick}>Вычислить</Button>
            </form>
            <div style={{display: 'flex', flexDirection: 'column', gap: 75}}>
                <div>
                    {points && <h3>Исходная таблица значений функции</h3>}
                    <div style={{display: 'flex', gap: 30, flexWrap: 'wrap', flexDirection: 'column', maxHeight: 100 * m / 3}}>
                        {points && points.map((point, index) => {
                            return (
                                <div style={{display: 'flex', gap: 5}}>
                                    <p>{index + 1})</p>
                                    <div style={{display: 'flex', gap: 10, border: '1px white solid', padding: 10, borderRadius: 5}}>
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
                    <div style={{display: 'flex', gap: 30, flexWrap: 'wrap', flexDirection: 'column', maxHeight: 100 * n / 3}}>
                        {nearestPoints && nearestPoints.map((point, index) => {
                            return (
                                <div style={{display: 'flex', gap: 5}}>
                                    <p>{index + 1})</p>
                                    <div style={{display: 'flex', gap: 10, border: '1px white solid', padding: 10, borderRadius: 5}}>
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
                    {diff && <h3>Значение абсолютной фактической погрешности для флрмулы Лагранжа</h3>}
                    {diff && <div>{diff}</div>}
                </div>
            </div>
        </>
    );
}
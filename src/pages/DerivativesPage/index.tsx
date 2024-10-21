import { useState } from 'react';
import styles from './index.module.css';
import { Button, FormItem, Input } from '@vkontakte/vkui';
import { IErrorObject, IPoint, IResult } from './types';
import { getAccFirstDerivative, getFirstDerivatives, getFunctionValues, getMoreAccurateFirstDerivatives, getMoreAccurateSecondDerivatives, getSecondDerivatives } from './utils';

export const DerivativesPage = () => {
    const [activeOption, setActiveOption] = useState<string>('');
    const [moreAcc, setMoreAcc] = useState<string>('Нет');

    const [error, setError] = useState<IErrorObject>();
    
    const [m, setM] = useState<number>();
    const [x0, setX0] = useState<number>();
    const [h, setH] = useState<number>();

    const [points, setPoints] = useState<IPoint[]>();
    const [result, setResult] = useState<IResult[]>();
    const [accResult, setAccResult] = useState<IResult[]>();


    const f1 = (x: number) => {
        return Math.exp(x) - x;
    }

    const f1FirstDerivative = (x: number) => {
        return Math.exp(x) - 1;
    }

    const f1SecondDerivative = (x: number) => {
        return Math.exp(x);
    }

    const f2 = (x: number) => {
        return Math.exp(4.5 * x);
    }

    const f2FirstDerivative = (x: number) => {
        return 4.5 * Math.exp(4.5 * x);
    }

    const f2SecondDerivative = (x: number) => {
        return 20.25 * Math.exp(4.5 * x);
    }

    const getError = (name: string) => {
        if (!error || !error[name]) {
            return '';
        }
        else {
            //@ts-ignore
            return error[name].message ?? '';
        }

    };

    const validateM = (value: any) => {
         if (value == '') {
            return;
        }

        value = Number(value);        

        if (isNaN(value) || !Number.isInteger(value)) {
            setError({
                ...error,
                m: {
                    type: 'NotANumber',
                    message: 'm должно быть целым числом',
                }
            });
            setM(undefined);
            return false;
        }
        else if (value < 4){
            setError({
                ...error,
                m: {
                    type: 'Min',
                    message: 'Число m должно быть больше или равно 4'
                }
            });
            setM(undefined);
            return false;
        }

        error && delete error.m;
        setError(error);
        console.log(1);
        setM(value);
        return true;
    };

    const validateH = (value: any) =>{
        if (value == '') {
            return;
        }

        value = Number(value);

        if (isNaN(value) || value <= 0) {
            setError({
                ...error,
                h: {
                    type: 'NotANumber',
                    message: 'h должно быть целым положительным числом',
                }
            });
            setH(undefined);
            return false;
        }

        //@ts-ignore
        error && delete error.h;
        setError(error);
        setH(value);
        return true;
    };

    const validateX0 = (value: any) => {
         if (value == '') {
            return;
        }

        value = Number(value);

        if (isNaN(value)) {
            setError({
                ...error,
                x0: {
                    type: 'NotANumber',
                    message: 'x0 должно быть числом',
                }
            });
            setX0(undefined);
            return false;
        }

        error && delete error.x0;
        setError(error);
        setX0(value);
        return true;
    };

    const onClick = () => {
        if (!m || !h || (!x0 && x0 != 0)){
            return;
        }

        let curPoints: IPoint[] = [];
        let curFirstDerivative: number[] = [];
        let curAccFirstDerivative: number[] = [];
        let curSecondDerivative: number[] = [];

        let moreAccFirstDerivative: number[] = [];
        let moreAccSecondDerivative: number[] = [];

        if (activeOption == '0')
        {
            curPoints = getFunctionValues(f1, m, x0, h);
            curFirstDerivative = curPoints.map((point) => f1FirstDerivative(point.x));
            curAccFirstDerivative = getAccFirstDerivative(curPoints);
            curSecondDerivative = curPoints.map((point) => f1SecondDerivative(point.x));

            moreAccFirstDerivative = getMoreAccurateFirstDerivatives(f1, m, x0, h);
            moreAccSecondDerivative = getMoreAccurateSecondDerivatives(f2, m, x0, h);
            setPoints(curPoints);
        }
        else if (activeOption == '1'){
            curPoints = getFunctionValues(f2, m, x0, h);
            curFirstDerivative = curPoints.map((point) => f2FirstDerivative(point.x));
            curAccFirstDerivative = getAccFirstDerivative(curPoints);
            curSecondDerivative = curPoints.map((point) => f2SecondDerivative(point.x));

            if (moreAcc == 'Да') {
                moreAccFirstDerivative = getMoreAccurateFirstDerivatives(f2, m, x0, h);
                moreAccSecondDerivative = getMoreAccurateSecondDerivatives(f2, m, x0, h);
            }

            setPoints(curPoints);
        }

        const firstDerivatives = getFirstDerivatives(curPoints || []);
        const secondDerivatives = getSecondDerivatives(curPoints);

        setResult(curPoints?.map((_, index) => {
            return ({
                x: curPoints[index].x,
                y: curPoints[index].y,
                firstDerivative: firstDerivatives[index],
                AbsDiffFirstDerivative: Math.abs(firstDerivatives[index] - curFirstDerivative![index]),
                accFirstDerivative: curAccFirstDerivative[index],
                AbsDiffaccFirstDerivative: Math.abs(firstDerivatives[index] - curAccFirstDerivative![index]),
                secondDerivative: secondDerivatives[index],
                AbsDiffSecondDerivative: Math.abs(secondDerivatives[index] - curSecondDerivative[index]),
            });
        }));

        if (moreAcc == 'Да') {
            setAccResult(curPoints?.map((_, index) => {
                return ({
                    x: curPoints[index].x,
                    y: curPoints[index].y,
                    firstDerivative: moreAccFirstDerivative[index],
                    AbsDiffFirstDerivative: Math.abs(firstDerivatives[index] - moreAccFirstDerivative![index]),
                    accFirstDerivative: 0,
                    AbsDiffaccFirstDerivative: 0,
                    secondDerivative: moreAccSecondDerivative[index],
                    AbsDiffSecondDerivative: Math.abs(secondDerivatives[index] - moreAccSecondDerivative[index]),
                });
            }));
        }
        else {
            setAccResult(undefined);
        }
    }

    return (
        <div>
            <div className={styles.head}>
                <h2>Нахождение производных табличнозаданной функции по формулам численного дифференцирования</h2>
                <form className={styles.form}>
                    <h4>Выберите функцию</h4>
                    <div className={styles.rowContainer}>
                        <div className={`${styles.option} ${activeOption == '0'? styles.activeOption : ''}`} onClick={() => setActiveOption('0')}>f(x) = e(x) - x</div>
                        <div className={`${styles.option} ${activeOption == '1'? styles.activeOption : ''}`} onClick={() => setActiveOption('1')}>f(x) = e(x)^4.5x</div>
                    </div>
                    <div className={styles.rowContainer}>
                    <FormItem top='Количество значений в таблице: m. m >=4' status={error?.m ? 'error' : 'default'} bottom={getError('m')}>
                        <Input onChange={(e) => validateM(e.target.value)}/>
                    </FormItem>
                    <FormItem top='Начальное значение в таблице: x0' status={error?.x0 ? 'error' : 'default'} bottom={getError('x0')}>
                        <Input onChange={(e) => validateX0(e.target.value)}/>
                    </FormItem>

                    <FormItem top='шаг: h'status={error?.h ? 'error' : 'default'} bottom={getError('h')}>
                        <Input onChange={(e) => validateH(e.target.value)}/>
                    </FormItem>
                    </div>
                    <h4>Иcпользовать метод Рунге-Ромберга</h4>
                    <div className={styles.rowContainer} style={{marginBottom: 30}}>
                        <div className={`${styles.option} ${moreAcc == 'Да'? styles.activeOption : ''}`} onClick={() => setMoreAcc('Да')}>Да</div>
                        <div className={`${styles.option} ${moreAcc == 'Нет'? styles.activeOption : ''}`} onClick={() => setMoreAcc('Нет')}>Нет</div>
                    </div>
                    <Button onClick={onClick}>Вычислить</Button>
                </form>
            </div>
            <div className={styles.contentContainer}>
                <div>
                    {points && <h3>Исходная таблица значений функции</h3>}
                    <div className={styles.pointsContainer} style={{ maxHeight: 90 * m / 3}}>
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
                {result && 
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>xi</th>
                            <th>f(xi)</th>
                            <th>f'(xi)чд, , o(h^2)</th>
                            <th>|f'(xi)т - f'(xi)чд|, o(h^2)</th>
                            <th>f'(xi), o(h^4)чд</th>
                            <th>|f'(xi)т - f(xi)чд|, o(h^4)</th>   
                            <th>f''(xi)чд</th>
                            <th>|f''(xi)т - f''(xi)чд|</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result && result.map((item) => {
                            return (
                                <tr>
                                    <td>{item.x}</td>
                                    <td>{item.y}</td>
                                    <td>{item.firstDerivative}</td>
                                    <td>{item.AbsDiffFirstDerivative}</td>
                                    <td>{item.accFirstDerivative}</td>
                                    <td>{item.AbsDiffaccFirstDerivative}</td>   
                                    <td>{item.secondDerivative}</td>
                                    <td>{item.AbsDiffSecondDerivative}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                }
                <div>
                    {accResult && <h3>Результат методом Рунге-Ромберга</h3>}
                    {accResult && 
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>xi</th>
                                <th>f(xi)</th>
                                <th>f'(xi)чд, , o(h^2)</th>
                                <th>|f'(xi)т - f'(xi)чд|, o(h^2)</th> 
                                <th>f''(xi)чд</th>
                                <th>|f''(xi)т - f''(xi)чд|</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accResult && accResult.map((item) => {
                                return (
                                    <tr>
                                        <td>{item.x}</td>
                                        <td>{item.y}</td>
                                        <td>{item.firstDerivative}</td>
                                        <td>{item.AbsDiffFirstDerivative}</td> 
                                        <td>{item.secondDerivative}</td>
                                        <td>{item.AbsDiffSecondDerivative}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    }
                </div>
            </div>
        </div>
    );
};

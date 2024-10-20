import { useState } from 'react';
import styles from './index.module.css';
import { Button, FormItem, Input } from '@vkontakte/vkui';
import { IErrorObject, IPoint } from './types';
import { getFunctionValues } from './utils';

export const DerivativesPage = () => {
    const [activeOption, setActiveOption] = useState<string>('');

    const [error, setError] = useState<IErrorObject>();
    
    const [m, setM] = useState<number>();
    const [x0, setX0] = useState<number>();
    const [h, setH] = useState<number>();

    const [points, setPoints] = useState<IPoint[]>();


    const f1 = (x: number) => {
        return Math.cos(3 * x) - x**3;
    }

    const f2 = (x: number) => {
        return Math.exp(x)**(4.5 *x);
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
        console.log(3);
         if (value == '') {
            console.log(2);
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
        if (!m || !h || !x0){
            console.log(m, h, x0);
            return;
        }

        console.log(1);
        let points;
        if (activeOption == '0')
        {
            points = getFunctionValues(f1, m, x0, h);
            setPoints(points);
        }
        else if (activeOption == '1'){
            points = getFunctionValues(f2, m, x0, h);
            setPoints(points);
        }

        console.log(points);
    }

    return (
        <div>
            <h2>Нахождение производных табличнозаданной функции по формулам численного дифференцирования</h2>
            <form className={styles.container}>
                <h4>Выберите функцию</h4>
                <div className={styles.rowContainer}>
                    <div className={`${styles.option} ${activeOption == '0'? styles.activeOption : ''}`} onClick={() => setActiveOption('0')}>f(x) = cos(3x) - x^3</div>
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
                <Button onClick={onClick}>Вычислить</Button>
            </form>
            <div style={{display: 'flex', flexDirection: 'column', gap: 75}}>
                <div>
                    {points && <h3>Исходная таблица значений функции</h3>}
                    <div style={{display: 'flex', gap: 30, flexWrap: 'wrap', flexDirection: 'column', maxHeight: 100 * (m ?? 3) / 3}}>
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
            </div>
        </div>
    );
};

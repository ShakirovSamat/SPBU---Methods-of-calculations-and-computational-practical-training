import { Link } from "react-router-dom";
import styles from './index.module.css'

export const MainPage = () => {
    return (
        <>
            <h2 className={styles.title}>Методы вычислений и вычислительный практикум</h2>
            <div className={styles.container}>
                <Link className={styles.link} to={'/nonlinear_equations'}>Нелинейные уравнения</Link>
                <Link className={styles.link} to={'/algebraic_interpolation'}>Алгебраическое интерполирование</Link>
            </div>
        </>
    );
};

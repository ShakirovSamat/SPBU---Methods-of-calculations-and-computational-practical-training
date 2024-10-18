import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { NonliniearEquationPage } from './pages/NonlinearEquationsPage';
import { AlgebraicInterpolationPage } from './pages/AlgebraicInterpolation';


const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage/>,
    },
    {
      path: '/nonlinear_equations',
      element: <NonliniearEquationPage/>
    },
    {
      path: '/algebraic_interpolation',
      element: <AlgebraicInterpolationPage/>
    }
  ])
  return (<RouterProvider router={router}/>);
}

export default App

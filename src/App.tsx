import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { NonliniearEquationPage } from './pages/NonlinearEquationsPage';


const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage/>,
    },
    {
      path: '/nonlinear_equations',
      element: <NonliniearEquationPage/>
    }
  ])
  return (<RouterProvider router={router}/>);
}

export default App

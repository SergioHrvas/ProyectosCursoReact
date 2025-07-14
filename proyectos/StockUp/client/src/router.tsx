import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { Products } from './pages/Products'
import { NewProduct, action as actionForm } from './pages/NewProduct'

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children: [
            {
                index: true, //para que sea en la pagina raiz
                element: <Products/>
            },
            {
                path: 'product/create',
                element: <NewProduct/>,
                action: actionForm
            }
        ]
    }
])
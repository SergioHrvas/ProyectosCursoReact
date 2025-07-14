import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { loader as productsLoader, Products } from './pages/Products'
import { NewProduct, action as actionForm } from './pages/NewProduct'
import { EditProduct, loader as editProductLoader } from './pages/EditProduct'

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children: [
            {
                index: true, //para que sea en la pagina raiz
                element: <Products/>,
                loader: productsLoader
            },
            {
                path: 'products/create',
                element: <NewProduct/>,
                action: actionForm
            },
            {
                path: 'products/:id/edit', // Patrón ROA
                element: <EditProduct/>,
                loader: editProductLoader
            }
        ]
    }
])
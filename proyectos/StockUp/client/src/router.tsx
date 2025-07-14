import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { loader as productsLoader, action as changeAvailableAction, Products } from './pages/Products'
import { NewProduct, action as actionForm } from './pages/NewProduct'
import { EditProduct, loader as editProductLoader, action as editProductAction } from './pages/EditProduct'
import { action as productInfoAction } from './components/ProductInfo'
export const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout />,
        children: [
            {
                index: true, //para que sea en la pagina raiz
                element: <Products/>,
                loader: productsLoader,
                action: changeAvailableAction
            },
            {
                path: 'products/create',
                element: <NewProduct/>,
                action: actionForm
            },
            {
                path: 'products/:id/edit', // Patrón ROA
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: 'products/:id/delete', 
                action: productInfoAction

            }
        ]
    }
])
import { Link, useLoaderData, type ActionFunctionArgs } from 'react-router-dom'
import { changeAvailable, getProducts } from '../services/ProductService'
import type { Product } from '../types'
import { ProductInfo } from '../components/ProductInfo'

export async function loader() {

  const products = await getProducts()

  return products
}

export async function action ( {request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData())

  if (data.id) {
    await changeAvailable(+data.id)
  }
  else {
    throw new Response('', { status: 401, statusText: "ID no válido" })
  }
  
}


export const Products = () => {

  const products: Product[] = useLoaderData()

  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-4xl font-black text-slate-700'>Productos</h2>
        <Link
          to={'/products/create'}
          className='rounded-md text-center bg-indigo-700 text-white font-bold text-sm uppercase p-3 cursor-pointer shadow-md hover:bg-indigo-900'
        >
          Agregar Producto
        </Link>
      </div>

      <div className="p-2">
        <table className="w-full mt-5 table-auto">
          <thead className="bg-slate-800 text-white">
              <tr>
                  <th className="p-2">Producto</th>
                  <th className="p-2">Precio</th>
                  <th className="p-2">Disponibilidad</th>
                  <th className="p-2">Acciones</th>
              </tr>
          </thead>
          <tbody>
          {products.map(prod => (
            <ProductInfo product={prod} key={prod.id}/>
          ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

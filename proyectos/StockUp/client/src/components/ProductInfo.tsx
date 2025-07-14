import { deleteProduct } from "../services/ProductService"
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { Form, redirect, useFetcher, useNavigate, type ActionFunctionArgs } from "react-router-dom"

type ProductInfoProps = {
  product: Product
}


export async function action({ params }: ActionFunctionArgs) {

  if (params.id) {
    await deleteProduct(+params.id)
  }
  else {
    throw new Response('', { status: 401, statusText: "ID no válido" })
  }

  return redirect('/')
}

export const ProductInfo = ({product} : ProductInfoProps) => {

  const fetcher = useFetcher()
  const navigate = useNavigate()

  return (
    <tr className="border-b ">
        <td className="p-3 text-lg text-gray-800">
          {product.name}
        </td>
        <td className="p-3 text-lg text-gray-800">
          {formatCurrency(product.price)}
        </td>
        <td className="p-3 text-lg text-gray-800">
          <fetcher.Form method="POST">
          <button 
            type="submit"
            name="id"
            value={product.id}
            className={`${product.available ? 'text-black' : 'text-red-800'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-slate-900`}
          >
            {product.available ? "En stock" : "Agotado"} 
          </button>
          </fetcher.Form>
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className="flex gap-2 items-center">
              <button
               className="bg-indigo-700 text-white rounded-lg w-full p-2 uppercase text-sm font-bold text-center hover:bg-indigo-900"
               onClick={() => navigate(`/products/${product.id}/edit`)}>Editar</button>
              <Form className="w-full"
                method="POST" 
                action={`products/${product.id}/delete`} 
                onSubmit={(e) =>  {
                  if(!confirm('¿Eliminar?')){
                    e.preventDefault()
                  }
                }}
              > 
              {/* El action es para que vaya a la URL /products/:id/delete
              y ejecute el action definido en router*/}
                <input
                  className="bg-red-700 w-full cursor-pointer text-white rounded-lg p-2 uppercase text-sm font-bold text-center hover:bg-red-900"
                  type="submit"
                  value="Eliminar"/>
              </Form>
           </div>
        </td>
    </tr> 
  )
}

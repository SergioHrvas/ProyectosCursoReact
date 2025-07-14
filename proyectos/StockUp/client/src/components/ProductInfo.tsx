import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { useNavigate } from "react-router-dom"

type ProductInfoProps = {
  product: Product
}

export const ProductInfo = ({product} : ProductInfoProps) => {

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
          {product.available ? "En stock" : "Sin existencias"} 
        </td>
        <td className="p-3 text-lg text-gray-800 ">
           <div className="flex gap-2 items-center">
              <button onClick={() => navigate(`/products/${product.id}/edit`)}>Editar</button>
              <button>Eliminar</button>
           </div>
        </td>
    </tr> 
  )
}

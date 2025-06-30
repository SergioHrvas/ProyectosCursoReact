import type { ActionDispatch } from 'react'
import type { Product as ProductType} from '../types'
import type { OrderActions } from '../reducers/orderReducer'

type ProductProps = {
    item: ProductType,
    dispatch: ActionDispatch<[action: OrderActions]>
}

export const Product = ({item, dispatch} : ProductProps) => {
  return (
    <button className="bg-orange-300 
                      border-2border-orange-900 
                      w-full 
                      p-4 
                      rounded-3xl 
                      flex justify-between
                      hover:bg-orange-500" 
            onClick={() => dispatch({type: "add-item", payload: {item: item}})}> {/* CUIDADO! Con argumento hay que pasar arrow function () => */}
        <p>{item.name}</p>
        <p className="font-black">{item.price} €</p>
    </button>
  )
}

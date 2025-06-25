import type { Product as ProductType} from '../types'

type ProductProps = {
    item: ProductType
    addProductToOrder: (item: ProductType) => void
}

export const Product = ({item, addProductToOrder} : ProductProps) => {
  return (
    <button className="bg-orange-300 
                      border-2border-orange-900 
                      w-full 
                      p-4 
                      rounded-3xl 
                      flex justify-between
                      hover:bg-orange-500" 
            onClick={() => addProductToOrder(item)}> {/* CUIDADO! Con argumento hay que pasar arrow function () => */}
        <p>{item.name}</p>
        <p className="font-black">{item.price} €</p>
    </button>
  )
}

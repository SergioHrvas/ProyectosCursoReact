import { useState } from "react"
import type { OrderProduct, Product } from "../types"

export default function useOrder(){
    
    const MAX_ITEMS = 10
    const MIN_ITEMS = 0

    const [order, setOrder] = useState<OrderProduct[]>([])

    const addProductToOrder = (element: Product) => {
        const productExists = order.find(item => item.id === element.id)
        if(!productExists){
            const newOrderProduct: OrderProduct = {...element, count: 1 }
            setOrder([...order, newOrderProduct])
        }
        else{
            setOrder(
                order.map(item => (item.id !== productExists.id || (item.count===MAX_ITEMS)) ? item : {...item, count: item.count + 1})
            )
        }

    }
    
    return {
        addProductToOrder,
        order
    }
}
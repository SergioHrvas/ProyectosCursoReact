import { useState } from "react"
import type { OrderProduct, Product } from "../types"

export default function useOrder(){
    
    const MAX_ITEMS = 10

    const [order, setOrder] = useState<OrderProduct[]>([])

    const [tip, setTip] = useState(0)

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
    
    const removeProductFromOrder = (id: OrderProduct['id']) => {
        setOrder(order.filter(element => element.id !== id))
    }

    const saveOrder = () => {
        setTip(0)
        setOrder([])
    }
    
    return {
        order,
        tip,
        setTip,
        addProductToOrder,
        removeProductFromOrder,
        saveOrder
    }
}
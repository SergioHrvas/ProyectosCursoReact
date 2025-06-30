import type { OrderProduct, Product } from "../types"

export type OrderActions = {
    type: "add-item",
    payload: {
        item: Product
    }
} | {
    type: "remove-from-order",
    payload: {
        id: OrderProduct['id']
    } 
} | {
    type: "save-order"
} | {
    type: "set-tip",
    payload: {
        quantity: number
    }
}

export type OrderState = {
    order: OrderProduct[],
    tip: number
}

export const initialState : OrderState = {
    order: [],
    tip: 0
}

const MAX_ITEMS = 10


export const orderReducer = (
    state: OrderState = initialState,
    action: OrderActions
): OrderState => {
    if(action.type === "add-item"){
        const productExists = state.order.find(item => item.id === action.payload.item.id)
        let orderUpdated: OrderProduct[] = []
        if(!productExists){
            const newOrderProduct: OrderProduct = {...action.payload.item, count: 1 }
            orderUpdated = [...state.order, newOrderProduct]
        }
        else{
            orderUpdated = state.order.map(item => (item.id !== productExists.id || (item.count===MAX_ITEMS)) ? item : {...item, count: item.count + 1})
        }

        return {
            ...state,
            order: orderUpdated
        }
    }
    else if (action.type === "remove-from-order"){
        return {
            ...state,
            order: state.order.filter(element => element.id !== action.payload.id)
        }
    }
    else if (action.type === "save-order"){
        return {
            ...state,
            order: [],
            tip: 0
        }
    }
    else if (action.type === "set-tip"){
        return {
            ...state,
            tip: action.payload.quantity
        }
    }
    else {
        return {
            ...state
        }
    }
}
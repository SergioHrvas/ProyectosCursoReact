import type { CartItem, Instrument } from "../types"
import { db } from "../data/db"

export type CartActions = {
    type: "add-to-cart",
    payload: { item: Instrument }
} | {
    type: "remove-from-cart",
    payload: {id : Instrument['id']}
} | {
    type: "change-count",
    payload: {id: Instrument['id'], inc: boolean}
} | {
    type: "clean-cart"
}

export type CartState = {
    data: Instrument[],
    cart: CartItem[]
}

// Carrito inicial (recuperamos de localStorage)
const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')

    // Comprobamos si hay algo
    return localStorageCart ? JSON.parse(localStorageCart) : []
}

export const initialState: CartState = {
    data: db,
    cart: initialCart()
}


//Constantes
const MAX_ITEMS = 10;
const MIN_ITEMS = 1;

export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) : CartState => {
    
    if(action.type === "add-to-cart"){

        //Buscamos si existe el elemento en el carrito
        const itemExists = state.cart.findIndex((item) => action.payload.item.id === item.id)

        let updatedCart: CartItem [] = []

        if (itemExists === -1) { //No existe en el carrito
            const newItem: CartItem = {...action.payload.item, count: 1 }
            updatedCart =
                [
                    ...state.cart,
                    newItem
                ]
        }
        else { // Ya existe en el carrito
            updatedCart = state.cart.map((item, indice) =>
                    (indice === itemExists && item.count < MAX_ITEMS)
                        ? { ...item, count: item.count + 1 }
                        : item
            )
        }
        
        return {
            ...state,
            cart: updatedCart
        }
        
    } else if (action.type === "remove-from-cart"){
        return {
            ...state,
            cart: state.cart.filter(element => element.id !== action.payload.id)
        }
    } else if (action.type === "change-count"){
        let updatedCart: CartItem[] = []
        if (action.payload.inc === true) //INCREMENTAR
            updatedCart = state.cart.map(element => (element.id === action.payload.id && element.count < MAX_ITEMS) ? { ...element, count: element.count + 1 } : element)
        else // DECREMENTAR
            updatedCart = state.cart.map(element => (element.id === action.payload.id && element.count > MIN_ITEMS) ? { ...element, count: element.count - 1 } : element)

        return {
            ...state,
            cart: updatedCart
        }
    } else if (action.type === "clean-cart"){
        return {
            ...state,
            cart: []
        }
    } else {
        return state
    }
}
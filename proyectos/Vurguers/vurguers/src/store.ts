import { create } from 'zustand'
import { OrderEntry } from './types'
import { Product } from '@prisma/client'

interface Store {
    order: OrderEntry[],
    addToOrder: (product: Product) => void,
    incEntryQuantity: (id: Product['id']) => void,
    decEntryQuantity: (id: Product['id']) => void,
    removeFromOrder: (id: Product['id']) => void,
    clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],

    addToOrder: (product: Product) => {
        const { description, categoryId, image, ...data } = product

        let entries: OrderEntry[] = []

        if(get().order.find(entry => entry.id === data.id)){
            entries = get().order.map(entry => {
                if(entry.id === data.id){
                    return {
                        ...entry,
                        quantity: entry.quantity + 1,
                        subtotal: (entry.quantity + 1) * entry.price
                    }
                }
                else return entry
            })
        } else {
            entries = 
                [
                    ...get().order,
                    {
                        ...data,
                        quantity: 1,
                        subtotal: data.price
                    }
                ]
        }
        
        set(() => ({
            order: entries
        }))
    },
    incEntryQuantity: (id: Product['id']) => {     
        set((status) => ({
            order: status.order.map(entry => {
            if(entry.id === id){
                return {
                    ...entry,
                    quantity: entry.quantity + 1,
                    subtotal: (entry.quantity + 1) * entry.price
                }
            }
            else return entry
        })
        }))
    },
    decEntryQuantity: (id: Product['id']) => {     
        let entries: OrderEntry[] = []

        const entryFound = get().order.find(entry => entry.id === id)!

        if(entryFound.quantity <= 1){
            entries = get().order.filter(entry => entryFound.id !== entry.id)
        }
        else {
            entries = get().order.map(entry => {
                        if(entry.id === entryFound.id){
                            return {
                                ...entry,
                                quantity: entry.quantity - 1,
                                subtotal: (entry.quantity - 1) * entry.price
                            }
                        }
                        else return entry
                    })
        }


        set(() => ({
            order: entries
        }))
    },
    removeFromOrder: (id: Product['id']) => {
        set((status) => ({
            order: status.order.filter(entry => entry.id !== id)
        }))
    },
    clearOrder: () => {
        set(() => ({
            order: []
        }))
    }
}))
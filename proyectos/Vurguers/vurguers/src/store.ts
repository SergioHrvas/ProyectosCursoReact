import { create } from 'zustand'
import { OrderEntry } from './types'

interface Store {
    order: OrderEntry[]
}

export const useStore = create<Store>(() => ({
    order: []

    
}))
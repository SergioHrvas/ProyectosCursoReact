import { Product } from "@prisma/client"

export type OrderEntry = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
}
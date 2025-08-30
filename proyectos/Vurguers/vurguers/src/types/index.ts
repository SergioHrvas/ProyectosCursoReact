import { Category, Order, OrderProducts, Product } from "@prisma/client"

export type OrderEntry = Pick<Product, 'id' | 'name' | 'price'> & {
    quantity: number
    subtotal: number
}

export type OrderExtended = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}

export type ProductExtended = Product & {
    category: Category
}
export type Product = {
    id: number,
    name: string,
    price: number
}

export type OrderProduct = Product & {
    count: number
}
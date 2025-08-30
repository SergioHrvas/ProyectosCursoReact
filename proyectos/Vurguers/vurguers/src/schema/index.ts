import {z} from 'zod'

export const OrderProductSchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    subtotal: z.number()
})

export const OrderSchema = z.object({
    name: z.string().min(1, {message: "El nombre es obligatorio"}),
    total: z.number().min(1, {message: "Error en la orden"}),
    orderProducts: z.array(OrderProductSchema)
})

export const SearchProductFormSchema = z.object({
    search: z.string().trim().min(1, {message: "El campo de búsqueda no puede estar vacío."})
})
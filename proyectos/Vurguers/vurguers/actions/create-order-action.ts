"use server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

export async function createOrder(data : unknown){
    const result = OrderSchema.safeParse(data)
    if(!result.success){
        return {
            errors: result.error.issues.map(issue => issue.message)
        }
    }
    
    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.orderProducts.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })

    } catch (error) {
        
    }

}
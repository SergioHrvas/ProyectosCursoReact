"use client"
import { useStore } from "@/src/store"
import { OrderDetails } from "./OrderDetails"
import { formatCurrency } from "@/src/utils"
import { useMemo } from "react"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export const OrderSummary = () => {

  const { order } = useStore()
  const total = useMemo(() => order.reduce((total, entry) => total + entry.subtotal, 0), [order])
  
  const handleCreateOrder = (formData: FormData) => {
    const data = {
      name: formData.get('name')
    }

    const result = OrderSchema.safeParse(data)
    if(!result.success){
      result.error.issues.forEach(issue => toast.error(issue.message))
    }
  }
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      
      <h1 className="text-4xl text-center font-black mb-5 mt-10">Mi pedido</h1>  

      
      { order.length === 0 ? <p className="text-center">No hay productos añadidos</p> : order.map(entry => (
        <OrderDetails key={entry.id} entry={entry}/>
      ))}

      <p className="text-2xl mt-12 text-center">
        Total: {''} <span className="font-bold">{formatCurrency(total)}</span>
      </p>

      <form className="w-full mt-6 space-y-4" action={handleCreateOrder}>
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          className="bg-white border border-gray-300 rounded-lg p-2 w-full"
        />
        <input 
          type="submit"
          className="py-3 text-white bg-slate-900 font-bold uppercase rounded w-full text-center cursor-pointer"
          value="Confirmar Pedido"
        />
      </form>
      
    </aside>
  )
}

"use client"
import { useStore } from "@/src/store"
import { OrderDetails } from "./OrderDetails"
import { formatCurrency } from "@/src/utils"
import { useMemo } from "react"

export const OrderSummary = () => {

  const { order } = useStore()
  const total = useMemo(() => order.reduce((total, entry) => total + entry.subtotal, 0), [order])
  
  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      
      <h1 className="text-4xl text-center font-black mb-5">Mi pedido</h1>  

      
      { order.length === 0 ? <p className="text-center">No hay productos añadidos</p> : order.map(entry => (
        <OrderDetails key={entry.id} entry={entry}/>
      ))}

      <p className="text-2xl mt-12 text-center">
        Total: {''} <span className="font-bold">{formatCurrency(total)}</span>
      </p>
    </aside>
  )
}

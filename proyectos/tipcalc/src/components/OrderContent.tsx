import React from 'react'
import type { OrderProduct } from '../types'

export const OrderContent = ({order} : {order: OrderProduct[]}) => {

  console.log(order)
  console.log("a")
  return (
    <>
        <h2 className="font-black text-4xl">Orden</h2>
        <div className="space-y-3 mt-5">
        {order.length === 0 
        ? (<p className='text-center'>Esta vacío</p>) 
        : (
            order.map(item => (
                <div key={item.id}>
                    <p>
                        {item.name}
                    </p>
                </div>
            ))
        )}
        </div>
    </>
  )
}

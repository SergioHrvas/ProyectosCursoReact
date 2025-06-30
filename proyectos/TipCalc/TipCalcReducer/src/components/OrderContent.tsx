import type { OrderProduct } from '../types'
import { formatCurrency } from '../helpers'
import type { OrderActions } from '../reducers/orderReducer'
import type { ActionDispatch } from 'react'

type OrderContentProps = {
    order: OrderProduct[]
    dispatch: ActionDispatch<[action: OrderActions]>,
}

export const OrderContent = ({order, dispatch} : OrderContentProps) => {

  return (
    <>
        <h2 className="font-black text-4xl">Orden</h2>
        <div className="space-y-2 mt-7">
        {
        order.map(item => (
            <div key={item.id} className='flex justify-between items-center border-t border-gray-700 py-3 last-of-type:border-b'>
                <div className=''>
                    <p className='text-lg'>
                    {item.name} - {formatCurrency(item.price)}
                    </p>
                    <p className="font-black">
                        Cantidad: {item.count} - {formatCurrency(item.price * item.count)}
                    </p>
                </div>
                <button 
                    onClick={() => dispatch({type: "remove-from-order", payload: {id: item.id}})}
                    className="bg-red-600 rounded-full h-8 w-8 text-white font-black">X</button>
            </div>
        ))
        }
        </div>
    </>
  )
}

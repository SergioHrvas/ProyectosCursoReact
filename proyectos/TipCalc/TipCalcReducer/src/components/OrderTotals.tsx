import { useMemo, type ActionDispatch } from "react"
import type { OrderProduct } from "../types"
import { formatCurrency } from "../helpers"
import type { OrderActions } from "../reducers/orderReducer"

type OrderTotalsProps = {
    order: OrderProduct[],
    tip: number,
    dispatch: ActionDispatch<[action: OrderActions]>,
}

export const OrderTotals = ({order, tip, dispatch} : OrderTotalsProps) => {
    
    // Utilizamos useMemo para que se renderice/vuelva a ejecutar cuando cambie order
    const subTotal = useMemo(() =>
        order.reduce((total, element) => total + element.count * element.price, 0)
    , [order])

    const tipTotal = useMemo(() =>
        subTotal * tip
    , [tip, subTotal])
    
    const total = useMemo(() =>
        subTotal + tipTotal
    , [subTotal + tipTotal])

    return (
    <>
        <div className="space-y-3">
            <h2 className='font-black text-2xl'>Totales y propina</h2>
            <p>Subtotal a pagar: {'' /*espacio en blanco*/}
                <span className='font-bold'>{formatCurrency(subTotal)}</span>
            </p>
            <p>Propina: {''}
                <span className='font-bold'>{formatCurrency(tipTotal)}</span>
            </p>
            <p>Total a pagar: {''}
                <span className='font-bold'>{formatCurrency(total)}</span>
            </p>
        </div>
        <button
            className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
            disabled={total === 0}
            onClick={() => dispatch({type: "save-order"})}
        >
            
                Almacenar orden
            </button>
    </>
  )
}

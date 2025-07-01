import React from 'react'
import { formatCurrency } from '../helpers'

type AmountDisplayProps = {
    label?: string,
    quantity: number
}

export const AmountDisplay = ({label, quantity} : AmountDisplayProps) => {
  return (
    <p className='text-2xl text-lime-800 font-bold'>
        {label && `${label}:`} {''}
        <span className="font-black text-black">{formatCurrency(quantity)}</span>
    </p>
  )
}

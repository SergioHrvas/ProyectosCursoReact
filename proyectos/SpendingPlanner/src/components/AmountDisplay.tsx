import React from 'react'
import { formatCurrency } from '../helpers'

type AmountDisplayProps = {
    label: string,
    quantity: number
}

export const AmountDisplay = ({label, quantity} : AmountDisplayProps) => {
  return (
    <p className='text-2xl text-lime-800 font-bold'>
        {label}: {''}
        <span className="font-black text-lime-950">{formatCurrency(quantity)}</span>
    </p>
  )
}

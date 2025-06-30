import { type ActionDispatch } from 'react'
import type { OrderActions } from '../reducers/orderReducer'

const tipOptions = [
    {
        id: 'tip-10',
        value: .10,
        label: '10%'
    },
    {
        id: 'tip-20',
        value: .20,
        label: '20%'
    },
    {
        id: 'tip-50',
        value: .50,
        label: '50%'
    }
]

type TipFormProps ={
    dispatch: ActionDispatch<[action: OrderActions]>,
    tip: number
}

export const TipForm = ({dispatch, tip} : TipFormProps) => {
  
  return (
    <div>
        <h3 className="font-black text-2xl"></h3>
        <form>
            {tipOptions.map(option => 
                (
                    <div key={option.id} className='flex gap-2'>
                        <label htmlFor={option.id}>{option.label}</label>
                        <input 
                            id={option.id}
                            type="radio"
                            name="tip"
                            value={option.value}
                            onChange={e => dispatch({type: "set-tip", payload: { quantity: +e.target.value }})}
                            checked={option.value === tip}
                        />
                    </div>
                )
            )}
        </form>
    </div>
  )
}

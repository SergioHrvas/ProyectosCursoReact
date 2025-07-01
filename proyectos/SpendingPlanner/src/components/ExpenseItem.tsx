import { useMemo } from "react"

import { categories } from "../data/categories"
import { formatDate } from "../helpers"
import type { Expense } from "../types"
import { AmountDisplay } from "./AmountDisplay"
import { useBudget } from "../hooks/useBudget"

import { SwipeableList,
         LeadingActions,
         SwipeAction,
         TrailingActions,
         SwipeableListItem 
       } from "react-swipeable-list"


import "react-swipeable-list/dist/styles.css"

type ExpenseItemProps = {
    expense: Expense
}

export const ExpenseItem = ({expense}: ExpenseItemProps) => {

  const {dispatch} = useBudget()

  const category = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

  const leadingActions = () => (    
    <LeadingActions>
      <SwipeAction
        onClick={() => dispatch({type: "set-exp-editing-id", payload: {id: expense.id}})}>
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )


  const trailingActions = () => (    
    <TrailingActions>
      <SwipeAction
        onClick={() => dispatch({type: "remove-expense", payload: {id: expense.id}})}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )


  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={30} //pixeles que queremos que se recorran
        leadingActions={leadingActions()} //izquierdo
        trailingActions={trailingActions()}
      >
        <div className="p-10 bg-white shadow-xl w-full border-b border-gray-300 flex gap-4 items-center">
          <div>
            <img
              src={`/icono_${category.icon}.svg`}
              alt="Icono del gasto"
              className="w-16"/>
          </div>
          <div className="flex-1 space-y-2">  
            <p className="text-sm font-bold uppercase text-slate-500">{category.name}</p>
            <p className="text-lg font-bold">{expense.name}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
          </div>
          
          <AmountDisplay quantity={expense.amount}/>

        
        </div>
      </SwipeableListItem>
  </SwipeableList>
  )
}

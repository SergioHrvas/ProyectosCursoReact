import type { Expense } from "../types"

type ExpenseItemProps = {
    expense: Expense
}

export const ExpenseItem = ({expense}: ExpenseItemProps) => {
  return (
    <div>{expense.name} {expense.amount}</div>
  )
}

import type { Expense, ExpenseState } from "../types"
import { v4 as uuidv4 } from 'uuid'

export type BudgetActions = {
    type: "add-budget",
    payload: {budget: number}
} | {
    type: "show-modal"
} | {
    type: "hide-modal"
} | {
    type: "add-expense",
    payload: {
        expense: ExpenseState
    }
}

export type BudgetState = {
    budget: number,
    modalShown: boolean,
    expenses: Expense[]
}

export const initialState : BudgetState = {
    budget: 0,
    modalShown: false,
    expenses: []
}


const createExpense = (expense: ExpenseState) : Expense => {
    return {
        ...expense,
        id: uuidv4()
    }
}
export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) : BudgetState => {
    if(action.type === "add-budget"){
        return {
            ...state,
            budget: action.payload.budget
        }
    }
    else if (action.type === "show-modal"){
        return {
            ...state,
            modalShown: true
        }
    }
    else if (action.type === "hide-modal"){
        return {
            ...state,
            modalShown: false
        }
    }
    else if (action.type === "add-expense"){

        const newExpense = createExpense(action.payload.expense)
        return {
            ...state,
            expenses: [
                ...state.expenses,
                newExpense
            ],
            modalShown: false //Cerramos la ventana
        }
    } else{
        return state
    }
}
import type { Category, Expense, ExpenseState } from "../types"
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
} | {
    type: "remove-expense",
    payload: {
        id: Expense['id']
    }
} | {
    type: "set-exp-editing-id",
    payload: {
        id: Expense['id']
    }
} | {
    type: "edit-expense",
    payload: {
        expense: Expense
    }
} | {
    type: "clear-app",
} | {
    type: "set-category-filter",
    payload: {
        categoryId: Category['id']
    }
}

export type BudgetState = {
    budget: number,
    modalShown: boolean,
    expenses: Expense[],
    expEditingId: Expense['id'],
    categoryFilter: Category['id']
}

const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0
}

const initialExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState : BudgetState = {
    budget: initialBudget(),
    modalShown: false,
    expenses: initialExpenses(),
    expEditingId: "",
    categoryFilter: ""
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
            modalShown: false,
            expEditingId: ""
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
    } else if (action.type === "remove-expense") {
        return {
            ...state,
            expenses: state.expenses.filter(exp => exp.id !== action.payload.id)
        }
    } else if (action.type === "set-exp-editing-id"){
        return {
            ...state,
            expEditingId: action.payload.id,
            modalShown: true
        }
    } else if (action.type === "edit-expense") {
        return {
            ...state,
            expenses: state.expenses.map(exp => exp.id === action.payload.expense.id ? action.payload.expense : exp),
            modalShown: false,
            expEditingId: ""
        }
    } else if (action.type === "clear-app"){
        return {
            ...state,
            expenses: [],
            budget: 0
        }
    } else if (action.type === "set-category-filter"){
        return {
            ...state,
            categoryFilter: action.payload.categoryId
        }
    } else{
        return state
    }
}
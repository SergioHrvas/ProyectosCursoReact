import { createContext, useReducer, type ActionDispatch, type ReactNode } from 'react'
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from '../reducers/budgetReducer'

type BudgetContextProps = {
    state: BudgetState,
    dispatch: ActionDispatch<[action: BudgetActions]>
}

type BudgetProviderProps = {
    children: ReactNode
}

// "Confia en mi, te voy a pasar correctamente tanto state como dispatch"
// export const BudgetContect = createContext<BudgetContextProps>({} as BudgetContextProps)

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({children}: BudgetProviderProps) => {

    const [state, dispatch] = useReducer(budgetReducer, initialState) 

    return (
        <BudgetContext.Provider
            value={{
                state, dispatch
            }}>
            {children}
        </BudgetContext.Provider>
    )
}
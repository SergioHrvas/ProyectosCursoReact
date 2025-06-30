export type BudgetActions = {
    type: "add-budget",
    payload: {budget: number}
}

export type BudgetState = {
    budget: number
}

const initialState : BudgetState = {
    budget: 0
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
    else{
        return state
    }
}
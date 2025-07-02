import { createContext, useReducer, type ActionDispatch, type ReactNode } from "react";
import { activityReducer, initialState, type ActivityActions, type ActivityState } from "../reducers/activityReducer";

export type ActivityContextProps = {
    state: ActivityState,
    dispatch: ActionDispatch<[action: ActivityActions]>
}

export type ActivityProviderProps = {
    children: ReactNode
}
export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({children} : ActivityProviderProps) => {
    
    const [state, dispatch] = useReducer(activityReducer, initialState)

    return (
        <ActivityContext.Provider
            value={{state,dispatch}}>
            {children}
        </ActivityContext.Provider>
    )
}
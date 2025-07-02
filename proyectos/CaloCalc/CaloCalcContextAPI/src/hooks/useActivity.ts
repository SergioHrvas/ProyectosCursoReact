import { useContext } from "react"
import { ActivityContext } from "../context/activityContext"

export const useActivity = () => {
    // Creamos el Context
    const context = useContext(ActivityContext)

    // si no hay context, lanzamos error
    if(!context) {
        throw new Error("useActivity must be used within an ActivityProvider")
    }

    return context
}
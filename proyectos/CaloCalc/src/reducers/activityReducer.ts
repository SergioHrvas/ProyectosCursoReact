import type { Activity } from "../types"

// Type que describirá lo que pasará en el reducer
export type ActivityActions = {
    type: 'save-activity',
    payload: {newActivity: Activity}

}

// Tipo del estado
type ActivityState = {
    activities : Activity[]
}

// Estado
export const initialState: ActivityState = {
    activities: []
}

// Conecta las acciones y el estado
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions // Contiene el type y el payload
) => {
    if(action.type === "save-activity"){
        //Manejamos la lógica para actualizar el state
        console.log("Desde el type de save-activity")

        return {
            ...state, //Se recomienda hacerlo aunque solo tengmaos activities
                      // por si ampliamos el estado para que sea escalable
            activities: [...state.activities, action.payload.newActivity]
        }
    }
    else{
        console.error("Actividad no registrada")
    }
    
    return state
}
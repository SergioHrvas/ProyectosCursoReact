import type { Activity } from "../types"

// Type que describirá lo que pasará en el reducer
export type ActivityActions = {
    type: 'save-activity',
    payload: {newActivity: Activity}
} | {
    type: 'set-activityId',
    payload: {id: Activity['id']}
} | {
    type: 'delete-activity',
    payload: {id: Activity['id']}
} | {
    type: 'clear-activities',
}

// Tipo del estado
export type ActivityState = {
    activities : Activity[],
    currentActivityId: Activity['id']
}


const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

// Estado
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    currentActivityId: ''
}

// Conecta las acciones y el estado
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions // Contiene el type y el payload
) => {
    if(action.type === "save-activity"){
        //Manejamos la lógica para actualizar el state
        let updatedActivities : Activity[] = []
        if(state.currentActivityId){
            // Estamos editando
            updatedActivities = state.activities.map(
                act => act.id === state.currentActivityId ? action.payload.newActivity : act 
            )
        }
        else{
            // Estamos añadiendo
            updatedActivities = [...state.activities, action.payload.newActivity]
        }
        return  {
            ...state, //Se recomienda hacerlo aunque solo tengmaos activities
                      // por si ampliamos el estado para que sea escalable
            activities: updatedActivities,
            currentActivityId: ""
        }
    }
    else if(action.type === "set-activityId"){
        return {
            ...state,
            currentActivityId: action.payload.id
        }
    }
    else if(action.type === "delete-activity"){
        return {
            ...state,
            activities: state.activities.filter(act => act.id !== action.payload.id)
        }
    }
    else if(action.type === "clear-activities"){
        return {
            ...state,
            activities: [],
            currentActivityId: ""
        }
    }
    else{
        console.error("Actividad no registrada")
    }
    
    return state
}
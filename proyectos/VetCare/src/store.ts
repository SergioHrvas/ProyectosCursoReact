import {create} from 'zustand'
import type {DraftPatient, Patient} from './types'
import { v4 as uuidv4 } from 'uuid'

//Definimos el type
type PatientState = {
    patients: Patient[],
    addPatient: (data: DraftPatient) => void,
    removePatient: (id: Patient['id']) => void
}

const createPatient = (patient: DraftPatient): Patient => {
    return {
        ...patient,
        id: uuidv4()
    }
}

//hook 
export const usePatientStore = create<PatientState>((set) => ({
    // State
    patients: [],


    // Funciones
    addPatient: (data) => {
        const newPatient = createPatient(data)
        set((state) => ({ //state es para tener presente el estado
            patients: [
                ...state.patients,
                newPatient
            ]
        }))
    },
    
    removePatient: (id) => {
        set((state) => ({
            patients: state.patients.filter(pac => pac.id !== id)
        }))
    }

}))
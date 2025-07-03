import {create} from 'zustand'
import type {DraftPatient, Patient} from './types'
import { v4 as uuidv4 } from 'uuid'

//Definimos el type
type PatientState = {
    patients: Patient[],
    patientEditingId: Patient['id'],
    addPatient: (data: DraftPatient) => void,
    removePatient: (id: Patient['id']) => void,
    setPatientEditingId: (id: Patient['id']) => void,
    updatePatient: (data: DraftPatient) => void
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
    patientEditingId: "",


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
    },

    setPatientEditingId(id) {
        set(() => ({
            patientEditingId: id
        }))
    },

    updatePatient(data) {
        set((state) => ({
            patients: state.patients.map(pac => pac.id === state.patientEditingId ? {...data, id: pac.id} : pac ),
            patientEditingId: ""
        }))
    }

}))
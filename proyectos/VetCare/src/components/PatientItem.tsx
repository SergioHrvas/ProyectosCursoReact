import { usePatientStore } from "../store"
import type { Patient } from "../types"
import { PatientInfo } from "./PatientInfo"
import { toast } from "react-toastify"

type PatientItemProps = {
    patient: Patient
}

export const PatientItem = ({patient}: PatientItemProps) => {

    const {removePatient, setPatientEditingId} = usePatientStore()
    
    const handleClick = () => {
        removePatient(patient.id)
        toast.error ("Paciente eliminado correctamente")
    }
    return (
        <div className="mx-5 my-10 px-5 py-5 bg-white shadow-lg rounded-xl">
            <PatientInfo value={patient.id} label="ID"/>
            <PatientInfo value={patient.name} label="Nombre"/>
            <PatientInfo value={patient.caretaker} label="Responsable"/>
            <PatientInfo value={patient.email} label="Correo Electrónico"/>
            <PatientInfo value={patient.date.toString()} label="Fecha"/>
            <PatientInfo value={patient.symptoms} label="Síntomas"/>

            <div className="flex flex-col md:flex-row justify-between mt-10 gap-3">
                <button
                    type="button"
                    onClick={() => {setPatientEditingId(patient.id)}}
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-800 text-white font-bold uppercase rounded-lg">Editar</button>
                <button
                    type="button"
                    onClick={handleClick}
                    className="py-2 px-10 bg-red-600 hover:bg-red-800 text-white font-bold uppercase rounded-lg">Eliminar</button>
            </div>
        </div>
    )
}

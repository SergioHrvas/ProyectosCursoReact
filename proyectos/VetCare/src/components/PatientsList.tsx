import { usePatientStore } from "../store"
import { PatientItem } from "./PatientItem"

export const PatientsList = () => {
    
    const {patients} = usePatientStore()

    return (
        <div className="md:w-1/2 lg:w-3/5 md: h-screen overflow-scroll">
            {patients.length === 0 ? (
            <>
                <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
                <p className="text-xl mt-5 mb-10 text-center">
                    Comienza agregando pacientes {''}
                    <span className="text-indigo-600 font-bold">en el formulario</span>
                </p>
            </>)
             : (
            <>
            <h2 className="font-black text-3xl text-center">Listado de pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Administra tus {''}
                <span className="text-indigo-600 font-bold">pacientes ingresados</span>
            </p>
            {patients.map(paciente => (
                <PatientItem key={paciente.id} patient={paciente}/>
            ))}
            </>)
            
            }
        </div>
    )
}

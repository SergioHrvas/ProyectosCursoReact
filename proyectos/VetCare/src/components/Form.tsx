import { useForm } from 'react-hook-form'
import { ErrorMessage } from './ErrorMessage'
import type { DraftPatient } from '../types'
import { usePatientStore } from '../store'
import { useEffect } from 'react'

export const Form = () => {

    const { addPatient, updatePatient, patientEditingId, patients } = usePatientStore()

    const { register, handleSubmit, setValue, formState: {errors}, reset } = useForm<DraftPatient>()
    const registerPatient = (data: DraftPatient) => {
        if(patientEditingId){
            updatePatient(data)
        }
        else{
            addPatient(data)
        }
        reset()
    }
    
    useEffect(() => {
        if(patientEditingId){
            const activePatient = patients.filter(pac => pac.id === patientEditingId)[0]
            setValue('name', activePatient.name)
            setValue('caretaker', activePatient.caretaker)
            setValue('email', activePatient.email)
            setValue('symptoms', activePatient.symptoms)
            setValue('date', activePatient.date)

        }
    }, [patientEditingId])

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
                noValidate
                onSubmit={handleSubmit(registerPatient)}
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm uppercase font-bold">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', {
                            'required': 'El nombre del paciente es obligatorio',                        
                        })}
                    />
                </div>
                
                {errors.name && 
                    <ErrorMessage>
                        {errors.name.message}
                    </ErrorMessage>
                }
                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                        Responsable
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3  border border-gray-100"
                        type="text"
                        placeholder="Nombre del Responsable"
                        {...register('caretaker', {
                            'required': 'El nombre del responsable es obligatorio',                        
                        })}
                    />
                </div>
                
                {errors.caretaker && 
                    <ErrorMessage>
                        {errors.caretaker.message}
                    </ErrorMessage>
                }

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3  border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register('email', {
                            required: 'El correo electrónico es obligatorio',                        
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'El email no es válido'
                            }
                        })}
                    />
                </div>

            
                {errors.email && 
                    <ErrorMessage>
                        {errors.email.message}
                    </ErrorMessage>
                }

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm uppercase font-bold">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3  border border-gray-100"
                        type="date"
                        {...register('date', {
                            required: 'La fecha es obligatoria',                        
                        })}
                    />
                </div>

                {errors.date && 
                    <ErrorMessage>
                        {errors.date.message}
                    </ErrorMessage>
                }

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3  border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register('symptoms', {
                            required: 'Los síntomas son obligatorios',                        
                        })}
                    ></textarea>
                </div>


                {errors.symptoms && 
                    <ErrorMessage>
                        {errors.symptoms.message}
                    </ErrorMessage>
                }

                <input
                    type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    value='Guardar Paciente'
                />
            </form>
        </div>
    )
}

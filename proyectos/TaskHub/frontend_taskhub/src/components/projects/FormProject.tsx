import { ErrorMessage } from '@/components/ErrorMessage'
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { ProjectFormType } from 'types';

type FormProjectProps = {
    errors: FieldErrors<ProjectFormType>,
    register: UseFormRegister<ProjectFormType>
}
export const FormProject = ({errors, register}: FormProjectProps) => {

    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Nombre del Proyecto
                </label>
                <input
                    id="projectName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {...register("name", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />

                {errors.name && (
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Nombre Cliente
                </label>
                <input
                    id="clientName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("client", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />

                {errors.client && (
                    <ErrorMessage>{errors.client.message}</ErrorMessage>
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Descripción del Proyecto"
                    {...register("description", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Description } from "@headlessui/react"
import { FormProject } from "@/components/projects/FormProject"
import type { ProjectFormType } from "@/types/index"
import { createProject } from "@/services/ProjectService"

export const NewProjectView = () => {

    const initialValues : ProjectFormType = {
        name: "",
        client: "",
        description: ""
    }
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues
    })

    const handleForm = (data: ProjectFormType) => {
        createProject(data)
    }

    return (
        <>
            <div
                className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-black">Nuevo proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-3">Crea un nuevo proyecto</p>

                <nav className='my-5'>
                    <Link
                        to="/"
                        className='bg-purple-600 font-bold text-white uppercase text-xl p-3 rounded-md hover:bg-purple-800 transition-colors'
                    >
                        Volver
                    </Link>
                </nav>

                <form
                    className="mt-10 bg-purple-100 shadow-xl p-10 rounded-lg"
                    onSubmit={handleSubmit(handleForm)}
                    noValidate
                >
                    <FormProject errors={errors} register={register}/>
                    <input
                        type="submit"
                        value="Crear proyecto"
                        className="bg-fuchsia-600 hover:bg-fuchsia-800 transition-color w-full rounded-lg p-3 text-white font-bold text-lg uppercase"
                    />

                </form>
            </div>
        </>
    )
}

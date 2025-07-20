import { Link, useNavigate } from 'react-router-dom'
import { FormProject } from './FormProject'
import type { ProjectFormType, ProjectType } from '@/types/index'
import { useForm } from 'react-hook-form'
import { updateProject } from '@/services/ProjectService'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type EditProjectFormProps = {
    project: ProjectType,
    projectId: ProjectType['_id']
}

export const EditProjectForm = ({project, projectId} : EditProjectFormProps) => {
    const navigate = useNavigate()

    const initialValues : ProjectFormType = {
        name: project.name,
        client: project.client,
        description: project.description
    }
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues
    })

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Proyecto modificado correctamente")
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['edit_project', projectId]})
            navigate('/')
        }
    })
    
    const handleForm = (formData: ProjectFormType) => {
        const data = {formData, projectId}
        mutate(data)
    }

  return (
    <div
        className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black">Editar proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-3">Edita un proyecto existente</p>

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
                value="Actualizar proyecto"
                className="bg-fuchsia-600 hover:bg-fuchsia-800 transition-color w-full rounded-lg p-3 text-white font-bold text-lg uppercase cursor-pointer"
            />

        </form>
    </div>
  )
}

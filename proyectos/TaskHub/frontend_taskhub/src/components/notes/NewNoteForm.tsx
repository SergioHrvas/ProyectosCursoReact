import type { NoteFormData } from '@/types/index'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '../ErrorMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/services/NoteService'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

type NewNoteFormProps = {
    taskId: string
}

export const NewNoteForm = ({taskId} : NewNoteFormProps) => {

    const initialValues : NoteFormData = {
        text: ""
    }

    const queryClient = useQueryClient()

    const { register, handleSubmit, reset, formState: {errors} } = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createNote,
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})

            reset()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const params = useParams()
    const projectId = params.projectId!

    const handleInputSubmit = (formData: NoteFormData) => {
        mutate({formData, taskId, projectId})
    }
    return (
        <form className="space-y-3 mt-5" onSubmit={handleSubmit(handleInputSubmit)} noValidate>
            <div className='flex flex-col gap-2'>
                <label htmlFor="noteText" className="font-bold">Nueva nota</label>
                <input
                    id="noteText"
                    className="w-full borderborder-gray-500 p-3 border-"
                    type="text"
                    placeholder="Escribe el texto de la nota"
                    {...register('text', {
                        required: "El texto de la nota es obligatorio"
                    })}/>
                    {errors.text && (
                        <ErrorMessage>{errors.text.message}</ErrorMessage>
                    )}

            </div>
            <input
                type="submit"
                value="Crear nota"
                className='px-4 py-2 font-bold text-white bg-fuchsia-700 text-lg hover:bg-fuchsia-900 cursor-pointer' />

        </form>
    )
}

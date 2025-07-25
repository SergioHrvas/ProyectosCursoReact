import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { type TaskFormType, type TaskType } from '@/types/index';
import { useNavigate, useParams } from 'react-router-dom';
import FormTask from './FormTask';
import { useForm } from 'react-hook-form';
import { updateTask } from '@/services/TaskService';
import { toast } from 'react-toastify';
import { useQueryClient, useMutation } from '@tanstack/react-query';

type EditTaskModalProps = {
    data: TaskType,
    taskId: TaskType['_id']
}

export default function EditTaskModal({data, taskId} : EditTaskModalProps) {
    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const params = useParams()
    const projectId = params.projectId!

    const initialValues : TaskFormType = {
        name: data.name,
        description: data.description
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues
    })

    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Tarea modificada correctamente")
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
            reset
            navigate(location.pathname, {replace: true})
        }
    })

    const handleForm = (formData: TaskFormType) => {
        console.log(formData)
        mutate({projectId, taskId, formData})
    }
    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => {navigate(location.pathname, { replace: true })} }>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <Dialog.Title
                                    as="h3"
                                    className="font-black text-4xl  my-5"
                                >
                                    Editar Tarea
                                </Dialog.Title>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-fuchsia-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >
                                    <FormTask errors={errors} register={register}/>

                    
                                    <input
                                        type="submit"
                                        className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                                        value='Guardar Tarea'
                                    />
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
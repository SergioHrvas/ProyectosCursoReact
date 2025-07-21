import { Fragment } from 'react';
import { DialogPanel, Transition, Dialog, DialogTitle, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormTask from './FormTask';
import { useForm } from 'react-hook-form';
import type { TaskFormType } from '@/types/index';
import { createTask } from '@/services/TaskService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function NewTaskModal() {

    const navigate = useNavigate()
    
    // Read if modal=true exists
    const { pathname, search } = useLocation()
    const queryParams = new URLSearchParams(search)
    const modalTask = queryParams.get('newTask')
    const show = modalTask ? true : false

    /** Get projectId */
    const params = useParams()
    const projectId = params.projectId

    const queryClient = useQueryClient()

    const initialValues: TaskFormType = {
        name: "",
        description: ""
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: initialValues
    })

    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Tarea creada correctamente")
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            
        }
    })

    const handleForm = (formData: TaskFormType) => {
        if(projectId)
            mutate({formData, projectId})
        
        reset()
        navigate(pathname, { replace:  true})
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { navigate(pathname, { replace: true }) }}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </DialogTitle>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form
                                        className="mt-10 bg-purple-100 shadow-xl p-10 rounded-lg space-y-8"
                                        onSubmit={handleSubmit(handleForm)}
                                        noValidate
                                    >
                                        <FormTask errors={errors} register={register} />
                                        <input
                                            type="submit"
                                            value="Añadir tarea"
                                            className="bg-fuchsia-600 hover:bg-fuchsia-800 transition-color w-full rounded-lg p-3 text-white font-bold text-lg uppercase cursor-pointer"
                                        />

                                    </form>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

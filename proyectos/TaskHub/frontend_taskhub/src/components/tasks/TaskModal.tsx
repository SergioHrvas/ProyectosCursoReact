import { Fragment, useEffect, type ChangeEvent } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getTask, updateStatus } from '@/services/TaskService';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import type { TaskStatus } from '@/types/index';
import { NotesPanel } from '../notes/NotesPanel';

export const statusColors : { [key:string] : string} = {
    pending: 'text-slate-500',
    onHold: 'text-red-500',
    underReview: 'text-blue-500',
    inProgress: 'text-amber-500',
    completed: 'text-green-500'
}

export default function TaskModal() {

    const params = useParams()
    const projectId = params.projectId!

    const {search, pathname} = useLocation()
    const queryParams = new URLSearchParams(search)
    const taskId = queryParams.get('task')!
    const show = taskId ? true : false

    const { data, isError, error} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTask({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    useEffect(() => {
        if(isError){
            toast.error(error.message, { toastId: 'error'})
        }
    }, [isError])


    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Estado de la tarea actualizado correctamente")
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        }
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        mutate({projectId, taskId, status: e.target.value as TaskStatus})
    }
    
    if(isError) {
        return <Navigate to={`/projects/${projectId}`} />
    }

    if(data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(pathname, {replace: true})}>
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
                                    <p className='text-sm text-slate-400'>Agregada el: {formatDate(data.createdAt)}</p>
                                    <p className='text-sm text-slate-400'>Última actualización: {formatDate(data.updatedAt)}</p>
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data.name}
                                    </Dialog.Title>
                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data.description}</p>
                                    <div className='my-7 space-y-3'>
                                        <label className='font-bold'>Estado Actual:</label>

                                        <select
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                            className='w-full p-3 bg-white border-gray-300'>
                                                {Object.entries(statusTranslations).map(([status, translation], idx) => 
                                                    <option key={`${status}-${idx}`} value={status}>{translation}</option>
                                                )}
                                        </select>
                                    </div>

                                    <p className='text-lg text-slate-600 font-bold mb-3'>Historial de cambios</p>
                                    {
                                        data.completedBy.length > 0 ? 
                                        <div className='p-2 space-y-2'>
                                            {data.completedBy.map(change => (
                                                <div className='flex justify-between'>
                                                    <span>{change.user.name} {''} {change.user.surname} {''} <span className='text-gray-400 text-sm'>(@{change.user.username})</span></span> <span className={`font-bold ${statusColors[change.status]}`}>{statusTranslations[change.status]}</span><span>{formatDate(change.date)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        : 
                                        <p>No hay cambios anteriores en el estado.</p>
                                    }

                                    <NotesPanel taskId={taskId} notes={data.notes}/>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

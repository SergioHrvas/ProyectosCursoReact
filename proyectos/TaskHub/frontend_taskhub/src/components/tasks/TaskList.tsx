import type { MinimalTaskType, ProjectType, TaskStatus, TaskType } from "@/types/index"
import { TaskCard } from "./TaskCard"
import { statusTranslations } from "@/locales/es"
import { DropTask } from "./DropTask"
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateStatus } from "@/services/TaskService"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"

type TaskListProps = {
    tasks: MinimalTaskType[]
    hasAuthorization: boolean
}

type GroupTask = {
    [key: string]: MinimalTaskType[]
}

const initialGroups: GroupTask = {
    pending: [],
    onHold: [],
    underReview: [],
    inProgress: [],
    completed: []
}


export const statusColors: { [key: string]: string } = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    underReview: 'border-t-blue-500',
    inProgress: 'border-t-amber-500',
    completed: 'border-t-green-500'
}


export const TaskList = ({ tasks, hasAuthorization }: TaskListProps) => {

    const params = useParams()
    const projectId = params.projectId!
    
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: updateStatus,
        onSuccess: () => {
            toast.success("Estado de la tarea actualizado correctamente")
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleDragEnd = (e : DragEndEvent) => {
        const { over, active } = e

        if(over && over.id){
            const taskId = active.id.toString();
            const status = over.id as TaskStatus
            mutate({projectId, taskId, status})

            //Actualizamos resultados de consulta de cache
            queryClient.setQueryData(['project', projectId], (oldData: ProjectType) => {
                const updatedTasks = oldData.tasks.map((task: MinimalTaskType) => {
                    if (task._id.toString() === taskId.toString()){
                        return { ...task, status: status}
                    }
                    return task
                })

                return {
                    ...oldData,
                    tasks: updatedTasks
                }
            })
        }
    }
    const groupedTasks = tasks.reduce((acc, task) => {
        let group = acc[task.status] ? [...acc[task.status], task] : [task]
        return { ...acc, [task.status]: group }
    }, initialGroups);

    return (
        <>
            <h2 className="text-5xl font-black mt-8">Tareas</h2>
            <div className="flex overflow-x-scroll 2xl:overflow-auto pb-16 gap-2">
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, tasks]) => (
                        <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                            <h3
                                className={`mt-8 capitalize text-xl font-light border-slate-300 bg-white p-4 border-t-8
                            ${statusColors[status]}`
                                }>
                                {statusTranslations[status]}</h3>

                            <DropTask status={status}/>

                            <ul className='mt-5 space-y-5'>
                                {tasks.length === 0 ? (
                                    <li className="text-gray-500 text-center pt-3">Sin tareas</li>
                                ) : (
                                    tasks.map(task => <TaskCard key={task._id} task={task} hasAuthorization={hasAuthorization} />)
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </>
    )
}

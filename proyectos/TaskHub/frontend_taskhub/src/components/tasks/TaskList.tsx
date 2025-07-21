import type { TaskType } from "@/types/index"
import { TaskCard } from "./TaskCard"

type TaskListProps = {
    tasks: TaskType[]
}

type GroupTask = {
    [key: string]: TaskType[]
}

const initialGroups : GroupTask = {
    pending: [],
    onHold: [],
    underReview: [],
    inProgress: [],
    completed: []
}

const statusTranslations : { [key:string] : string} = {
    pending: 'Pendiente',
    onHold: 'En espera',
    underReview: 'En revisión',
    inProgress: 'En progreso',
    completed: 'Completado'
}

const statusColors : { [key:string] : string} = {
    pending: 'border-t-slate-500',
    onHold: 'border-t-red-500',
    underReview: 'border-t-blue-500',
    inProgress: 'border-t-amber-500',
    completed: 'border-t-green-500'
}

export const TaskList = ({ tasks }: TaskListProps) => {


    const groupedTasks = tasks.reduce((acc, task) => {
        let group = acc[task.status] ? [...acc[task.status], task] : [task]
        return { ...acc, [task.status]: group}
    }, initialGroups);

    return (
        <>
            <h2 className="text-5xl font-black mt-8">Tareas</h2>
            <div className="flex overflow-x-scroll 2xl:overflow-auto pb-16">
            {Object.entries(groupedTasks).map(([status, tasks]) => (
                <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                    <h3
                        className={`mt-8 capitalize text-xl font-light border-slate-300 bg-white p-4 border-t-8
                            ${statusColors[status]}`
                        }>
                            {statusTranslations[status]}</h3>
                    <ul className='mt-5 space-y-5'>
                        {tasks.length === 0 ? (
                            <li className="text-gray-500 text-center pt-3">Sin tareas</li>
                        ) : (
                            tasks.map(task => <TaskCard key={task._id} task={task} />)
                        )}
                    </ul>
                </div>
            ))}
            </div>
        </>
    )
}

import { EditTaskData } from "@/components/tasks/EditTaskData"
import NewTaskModal from "@/components/tasks/NewTaskModal"
import { TaskList } from "@/components/tasks/TaskList"
import TaskModal from "@/components/tasks/TaskModal"
import { getProject } from "@/services/ProjectService"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useNavigate, useParams } from "react-router-dom"


export const InfoProjectPage = () => {

  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProject(projectId),
    retry: false
  }
  )

  if (isLoading) {
    return <p>Cargando...</p>
  }

  if (isError){
    return <Navigate to="/404" />
  }
  
  if (data) return (
    <>
      <h1 className="text-5xl font-black">{data.name}</h1>
      <p className="text-2xl font-light text-gray-600 mt-5">{data.description}</p>
      <nav className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => navigate('?newTask=true')}
          className='bg-purple-600 font-bold text-white uppercase text-xl p-3 rounded-md hover:bg-purple-800 transition-colors'
        >
          Añadir tarea
        </button>
      </nav>
      <TaskList
        tasks={data.tasks}
      />

      <NewTaskModal/>
      <EditTaskData/>
      <TaskModal/>
    </>

  )

}

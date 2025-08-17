import { EditTaskData } from "@/components/tasks/EditTaskData"
import NewTaskModal from "@/components/tasks/NewTaskModal"
import { TaskList } from "@/components/tasks/TaskList"
import TaskModal from "@/components/tasks/TaskModal"
import { useAuth } from "@/hooks/useAuth"
import { getProject } from "@/services/ProjectService"
import { isAdmin } from "@/utils/policies"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"


export const InfoProjectPage = () => {
  const { data: authData, isLoading: isAuthLoading } = useAuth()


  const navigate = useNavigate()
  const params = useParams()
  const projectId = params.projectId!

  const { data, isLoading, isError } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProject(projectId),
    retry: false
  }
  )

  const hasAuthorization = useMemo(()=> data?.admin === authData?._id, [data, authData])

  
  if (isLoading || isAuthLoading) {
    return <p>Cargando...</p>
  }

  if (isError){
    return <Navigate to="/404" />
  }
  
  if (data && authData) return (
    <>
      <h1 className="text-5xl font-black">{data.name}</h1>
      <p className="text-2xl font-light text-gray-600 mt-5">{data.description}</p>
      <nav className="mt-5 flex gap-3">
        {isAdmin(data.admin, authData._id) && 
        <>
        <button
          type="button"
          onClick={() => navigate('?newTask=true')}
          className='bg-purple-600 font-bold text-white uppercase text-xl p-3 rounded-md hover:bg-purple-800 transition-colors'
        >
          Añadir tarea
        </button>

        <Link
          to={`team`}
          className='bg-fuchsia-600 font-bold text-white uppercase text-xl p-3 rounded-md hover:bg-fuchsia-800 transition-colors'
        >
            Administrar equipo
        </Link>
        </>
        }
      </nav>
      <TaskList
        tasks={data.tasks} hasAuthorization={hasAuthorization}
      />

      <NewTaskModal/>
      <EditTaskData/>
      <TaskModal/>
    </>

  )

}

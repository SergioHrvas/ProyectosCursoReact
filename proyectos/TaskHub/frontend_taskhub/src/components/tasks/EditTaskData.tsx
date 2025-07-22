import { Navigate, useLocation, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTask } from "@/services/TaskService"
import EditTaskModal from "./EditTaskModal"
export const EditTaskData = () => {

    const {search} = useLocation()    
    const queryParams = new URLSearchParams(search)
    const taskId = queryParams.get('editTask')!
    const show = taskId ? true : false

    const params = useParams()
    const projectId = params.projectId!

    const {data, isError} = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTask({projectId, taskId}),
        enabled: !!taskId //Solo hará la consulta cuando haya taskId
    })
    if(isError) return <Navigate to={'/404'}/>
    if(data) return <EditTaskModal data={data} taskId={taskId}/>
   
}

import { EditProjectForm } from "@/components/projects/EditProjectForm"
import { getProject } from "@/services/ProjectService"
import { useQuery } from "@tanstack/react-query"
import { Navigate, useParams } from "react-router-dom"

export const EditProjectPage = () => {

    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ['edit_project', projectId],
        queryFn: () => getProject(projectId),
        retry: false
    }
    )

    if(isLoading){
        return <p>Cargando...</p>
    }

    if(isError)
        return <Navigate to="/404"/>

    return (
        <>
            {
                data ? 
                <EditProjectForm project={data} projectId={projectId}/>
                : <p>Error en el proyecto a modificar</p> 
            }
        </>
        
    )
}

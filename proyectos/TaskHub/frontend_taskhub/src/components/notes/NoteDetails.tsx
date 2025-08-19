import { useAuth } from "@/hooks/useAuth"
import { deleteNote } from "@/services/NoteService"
import type { NoteReduced } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailsProps = {
    note: NoteReduced,
    taskId: string
}

export const NoteDetails = ({note, taskId} : NoteDetailsProps) => {

  const {data, isLoading} = useAuth()

  const canDelete = useMemo(() => note.author._id === data?._id, [note, data])

  const params = useParams()
  const projectId = params.projectId!

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: deleteNote,
    onSuccess: (data) => {
      toast.success(data)
      queryClient.invalidateQueries({queryKey: ['task', taskId]})

    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const handleDelete = () => {
    mutate({noteId: note._id, taskId, projectId})
  }
  
  if(isLoading) return <p>Cargando...</p>

  if(data){
    return (
      <div className="flex justify-between items-center">
        <span className="italic max-w-[20rem] break-words flex-1">{note.text}</span>
        <span className="text-xs text-gray-600 text-center flex-shrink-0 w-[16rem]">{`Por @${note.author.username} el ${formatDate(note.createdAt)}`}</span>
        {canDelete ? (
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white p-2 rounded-md flex-shrink-0 cursor-pointer hover:bg-red-800 transition-colors">Eliminar</button>
        ) : (
          <span className="w-[4.3rem] flex-shrink-0"></span>
        )}
      </div>
    )
  }
}
